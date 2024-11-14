// import packageJSON from "../../../package.json";
import express, { Application, Response } from "express";
import cors from "cors";
// import { Request, Response } from "express";
import { Collections } from "./mongo";
import { ENDPOINTS } from "@/typings/constants";
import { BadgeDataRequest } from "@/utils/client/askforassets";
import { UserData } from "@/typings/database";
import { ObjectId } from "mongodb";
import { ExerciseDataImpl } from "@/typings/database/impl/userdataimpl.ts";
import { AddExercisePacket, LoginPacket } from "@/typings/packets.ts";


const app: Application = express();

function onInvalidPayload(res: Response): void {
  res.status(400).send()
  return;
}


app.use(express.json({ limit: "20mb" }));
app.use(cors());
app.use(express.urlencoded({ extended: true }));


// Serve a successful response. For use with wait-on
app.get("/api/v1/health", (req, res) => {
  res.send({ status: "ok" });
});


app.post(ENDPOINTS.Forms.Login, async (req, res, next) =>
{
  // incoming: login, password
  // outgoing: id, name, error
  const { login, password } = req.body;
  const results = await (await Collections.UserData.find({ username: login, password: password })).toArray();
  let id = '';
  let name = '';
  if( results.length > 0 )
  {
    id = results[0]._id.toHexString();
    name = results[0].name;
    var ret = {id:id, name:name, error:''};
    res.status(200).json(ret);
  }
  else
  {
    var ret = {id:'', name:'', error:'User not found.'};
    res.status(400).json(ret);
  }
  res.send();
});

app.post(ENDPOINTS.Forms.Register, async (req, res, next) =>
{
  // incoming: name, email, login, password
  // outgoing: id, error
  const { name, email, login, password } = LoginPacket.deserialize(req.body);
  
  
  const results = await (await Collections.UserData.insert({ name: name, email: email, username: login, password: password, badges: [], exerciseLog: [], goals: {}}));
  if( results != null )
  {
    var ret = {id:results.insertedId.toHexString(), error:''};
    res.status(200).json(ret);
  }
  else
  {
    var ret = {id:'', error:'User not appended.'};
    res.status(400).json(ret);
  }
  //res.send();
});


app.post('/api/v1/newForm', async (req, res, next) =>
{
  // incoming: type, calories, source
  // outgoing: id, error
  let error = '';
  const { type, calories, source } = req.body;

  // get the userId (might be a better way to do this)
  const _id = req.headers['_id'];

  try 
  {
    if (!type || !calories || !source) {
      throw new Error('Missing required fields');
    }

    let updateResult;
    // if log exercise button is clicked
    if (source === 'logExercise') 
    {
      // we can change the units field to calories or just add another field for calories
      // for testing i'm just using my id in the header in postman
      updateResult = await Collections.UserData.updateOne({ _id: _id }, { $push: { exerciseLog: { type: type, calories: calories, date: new Date() } } });
    } 
    // if set goal button is clicked
    else if (source === 'setGoal') 
    {
      // the actual input into the goals field needs to be changed
      updateResult = await Collections.UserData.updateOne({ _id: _id }, { $push: { goals: { type: type, calories: calories, date: new Date() } } });
    }

    if (!updateResult || updateResult.modifiedCount === null) {
      throw new Error('Update failed');
    }

    res.status(200).json({ id: _id, error: error });
  }
  catch (err) {
    var ret = {id:'', error: 'Error inserting data.'};
    res.status(400).json(ret);
  }
  res.send();
});



app.post(ENDPOINTS.Forms.AddExercise, async (req, res) => {
  const payload = AddExercisePacket.deserialize(req.body)
  if (!payload)
    return onInvalidPayload(res)
  
  const exercise = ExerciseDataImpl.of(payload)
  
  await Collections.UserData.pushExercise(payload.userId, exercise) // TODO return error if invalid
  
  res.status(200).send()
})

// Get badge data (name, desc, etc.) by id
app.get(ENDPOINTS.Data.Badges, async (req, res) => {
  const payload = BadgeDataRequest.deserialize(req.body)
  if (!payload) {
    return onInvalidPayload(res)
  }
  
  const badgeData = await Collections.Badges.get({_id: payload.id})
  if (badgeData)
    res.header("Content-Type", "application/json").status(200).json(badgeData)
  else
    res.status(500).send()
})


app.use(express.static("./.local/vite/dist"));


export default app;