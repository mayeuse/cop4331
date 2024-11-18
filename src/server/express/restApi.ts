import express, { Application, Response, Request } from "express";
import cors from "cors";
import { Collections } from "./mongo";
import { AUTH_HEADER, ENDPOINTS } from '@/typings/constants';
import { BadgeDataRequest } from "@/utils/client/askforassets";
import { ExerciseDataImpl, GoalDataImpl, UserDataImpl } from "@/typings/database/impl/userdataimpl.ts";
import {
  AddExercisePacket,
  IResetPasswordPacket,
  IAddGoalPacket, ILoginPacket, IRegisterPacket, ErrorPacket, UserDataRequest, IUserDataRequest,
} from '@/typings/packets.ts';
import { sendMail } from "@/utils/mailer";
import { ObjectId } from "mongodb";
import { Intervals } from "@/typings";
import * as assert from 'node:assert';



const app: Application = express();

function onInvalidPayload(res: Response, errorMessage: string = "Invalid payload.", errorCode: number = 0): void {
  res.status(400).json({
    code: errorCode,
    message: errorMessage
  } as ErrorPacket);
  return;
}


app.use(express.json({ limit: "20mb" }));
app.use(cors());
app.use(express.urlencoded({ extended: true }));


// Serve a successful response. For use with wait-on
app.get("/api/v1/health", (req, res) => {
  res.send({ status: "ok" });
});


app.post(ENDPOINTS.Forms.Login, async (req, res, next) => {
  // incoming: login, password
  // outgoing: id, name, error
  const { login, password } = req.body as ILoginPacket;
  const results = await (await Collections.UserData.find({ username: login, password: password })).toArray();
  
  if (results.length !== 0) {
    res.status(200).json(results[0])
    return;
  }
  
  let id = "";
  let name = "";
  if (results.length > 0) {
    id = results[0]._id.toHexString();
    name = results[0].name;
    const ret = { id: id, name: name, error: "" };
    res.status(200).json(ret);
  } else {
    const ret = { id: "", name: "", error: "User not found." };
    res.status(400).json(ret);
  }
  // res.send();
});

app.post(ENDPOINTS.Forms.Register, async (req, res, next) => {
  // incoming: name, email, login, password
  // outgoing: id, error
  let error = ''
  const { name, email, login, password } = req.body as IRegisterPacket;
  
  
  const results = await Collections.UserData.insert(new UserDataImpl(name, login, password, { email }));
  
  if (results != null) {
    const verifyURL = `http://localhost:9000/login`;
    await sendMail(email, 'Verify your Email for Appley\'s Training', `Welcome to Appley's Training! Click this link to log in to your new account: ${verifyURL}`);
    error = 'verification email sent';

    const ret = { id: results.insertedId.toHexString(), error: error };
    res.status(200).json(ret);
  } else {
    error = "User not appended.";
    const ret = { id: "", error: error };
    res.status(400).json(ret);
  }
  //res.send();
});


app.post('/api/v1/forgotPassword', async (req, res, next) =>
{
  // incoming: email
  // outgoing: error, confirmation of email sent
  let error = '';
  const { email } = req.body;

  const user = (await Collections.UserData.findOne({ email: email}));
  
  if (!user) {
    error = 'User not found'
    var ret = {id:'', error: error};
    res.status(400).json(ret);
    res.send();
  }
  else
  {
    const resetURL = `http://localhost:9000/reset-password?user=${email}`;

    await sendMail(email, 'Password Reset', `You requested a password reset. Click the link to reset your password: ${resetURL}`);
  
    error = 'Password Reset Email Sent'
    var ret = {id:'', error: error};
    res.status(200).json(ret);
    res.send();
  }
});

app.post('/api/v1/passwordReset', async (req, res, next) =>
{
  // incoming: new password, confirm new password
  // outgoing: error, confirmation

  let error = ''
  const { newPassword, confirmPassword } = req.body as IResetPasswordPacket;

  const userEmail = req.query.user?.toString();

  if (newPassword === confirmPassword){
    var updateResult = await Collections.UserData.updateOne({ email: userEmail }, { $set: { "password": newPassword}});
    if (!updateResult || updateResult.modifiedCount === null) {
      throw new Error('Update failed');
    }
    else{
      error = 'Password Update Successful'
      var ret = {error: error};
      res.status(200).json(ret);
      res.send();
    }
  }
  else {
    error = 'Bad request - Passwords do not match'
    var ret = { error: error };
    res.status(400).json(ret);
    res.send();
  }
});


app.post(ENDPOINTS.Forms.AddExercise, async (req, res) => {
  const payload: AddExercisePacket = req.body;
  if (!payload)
    return onInvalidPayload(res);
  
  const exercise = ExerciseDataImpl.of(payload);
  
  await Collections.UserData.pushExercise(ObjectId.createFromHexString(payload.userId), exercise); // TODO return error if invalid
  
  res.status(200).send();
});

app.post(ENDPOINTS.Forms.AddGoal, async (req, res) => {
  const payload: IAddGoalPacket = req.body;
  if (!payload.userId || !req.headers[AUTH_HEADER]) {
    return onInvalidPayload(res, "No authentication.");
  }
  const GoalCtor = GoalDataImpl.forType(payload.type);
  if (!GoalCtor) {
    return onInvalidPayload(res, "No goal found for " + payload.type);
  }
  
  let interval;
  switch (payload.interval) {
    case "WEEKLY":
      interval = Intervals.WEEKLY;
      break;
    case "BIWEEKLY":
      interval = Intervals.BIWEEKLY;
      break;
    case "MONTHLY":
      interval = Intervals.MONTHLY;
      break;
    default:
      onInvalidPayload(res)
      return;
  }
  
  // if (!(await )) // TODO check that user exists? or ig the update goal thing does that already
  
  const pushResult = await Collections.UserData.updateGoal(ObjectId.createFromHexString(payload.userId), payload.type, new GoalCtor(payload.target, interval));
  if (pushResult.acknowledged)
    res.status(200).send()
  else
    res.status(500).send()
})

// Get badge data (name, desc, etc.) by id for dashboard badge display
app.get(ENDPOINTS.Data.Badges, async (req, res) => {
  const payload: BadgeDataRequest = req.body;
  if (!payload) {
    return onInvalidPayload(res);
  }
  
  const badgeData = await Collections.Badges.get({ _id: ObjectId.createFromHexString(payload.id) });
  if (badgeData)
    res.status(200).json(badgeData);
  else
    res.status(500).send();
});

app.post(ENDPOINTS.Data.RetrieveUserData, async (req: Request, res: Response) => {
  // use the id of logged in user to get the exercise log and goals
  // allows frontend to display this info in progress page
  console.log("received: " + JSON.stringify(req.body))
  try {
    const payload: IUserDataRequest = req.body;
    if (!payload) {
      return onInvalidPayload(res);
    }
    console.log(payload)
    const userId = ObjectId.createFromHexString(payload.id);
    const user = await Collections.UserData.findOne({ _id: userId });
    if (!user) {
      res.status(400).json({ error: "User not found" });
      return;
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error("Error retrieving user data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use(express.static("./.local/vite/dist"));


export default app;