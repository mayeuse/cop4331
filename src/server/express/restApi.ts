import express, { Application, Response } from "express";
import cors from "cors";
import { Collections } from "./mongo";
import { ENDPOINTS } from "@/typings/constants";
import { BadgeDataRequest } from "@/utils/client/askforassets";
import { ExerciseDataImpl, GoalDataImpl, UserDataImpl } from "@/typings/database/impl/userdataimpl.ts";
import { AddExercisePacket, AddGoalPacket, RegisterPacket } from "@/typings/packets.ts";
import { sendMail } from "@/utils/mailer";


const app: Application = express();

function onInvalidPayload(res: Response): void {
  res.status(400).send();
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
  const { login, password } = req.body;
  const results = await (await Collections.UserData.find({ username: login, password: password })).toArray();
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
  res.send();
});

app.post(ENDPOINTS.Forms.Register, async (req, res, next) => {
  // incoming: name, email, login, password
  // outgoing: id, error
  const { name, email, login, password } = RegisterPacket.deserialize(req.body);
  
  
  const results = await Collections.UserData.insert(new UserDataImpl(name, login, password, { email }));
  if (results != null) {
    const ret = { id: results.insertedId.toHexString(), error: "" };
    res.status(200).json(ret);
  } else {
    const ret = { id: "", error: "User not appended." };
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
  const { newPassword, confirmPassword } = req.body;

  const userEmail = req.query.user?.toString();

  if (newPassword.equals(confirmPassword)){
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
  const payload = AddExercisePacket.deserialize(req.body);
  if (!payload)
    return onInvalidPayload(res);
  
  const exercise = ExerciseDataImpl.of(payload);
  
  await Collections.UserData.pushExercise(payload.userId, exercise); // TODO return error if invalid
  
  res.status(200).send();
});

app.post(ENDPOINTS.Forms.Goals, async (req, res) => {
  const payload = AddGoalPacket.deserialize(req.body);
  if (!payload) {
    return onInvalidPayload(res);
  }
  const GoalCtor = GoalDataImpl.forType(payload.type);
  if (!GoalCtor) {
    return onInvalidPayload(res);
  }
  const pushResult = await Collections.UserData.updateGoal(payload.userId, payload.type, new GoalCtor(payload.target, payload.interval));
  if (pushResult.acknowledged)
    res.status(200).send()
  else
    res.status(500).send()
})

// Get badge data (name, desc, etc.) by id for dashboard badge display
app.get(ENDPOINTS.Data.Badges, async (req, res) => {
  const payload = BadgeDataRequest.deserialize(req.body);
  if (!payload) {
    return onInvalidPayload(res);
  }
  
  const badgeData = await Collections.Badges.get({ _id: payload.id });
  if (badgeData)
    res.status(200).json(badgeData);
  else
    res.status(500).send();
});


app.use(express.static("./.local/vite/dist"));


export default app;