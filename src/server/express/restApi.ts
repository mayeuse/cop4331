// import packageJSON from "../../../package.json";
import express, { Application } from "express";
import cors from "cors";
// import { Request, Response } from "express";
import { Collections } from "./mongo";


const app: Application = express();


app.use(express.json({ limit: "20mb" }));
app.use(cors());
app.use(express.urlencoded({ extended: true }));


// Serve a successful response. For use with wait-on
app.get("/api/v1/health", (req, res) => {
  res.send({ status: "ok" });
});


app.post('/api/v1/login', async (req, res, next) =>
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

app.post('/api/v1/register', async (req, res, next) =>
{
  // incoming: name, email, login, password
  // outgoing: id, error
  const { name, email, login, password } = req.body;
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
  // incoming: type, units, source
  // outgoing: id, error
  let error = '';
  const { type, units, source } = req.body;

  // get the userId (might be a better way to do this)
  const userId = req.headers['userid'];

  try 
  {
    if (!type || !units || !source) {
      throw new Error('Missing required fields');
    }

    let updateResult;
    // if log exercise button is clicked
    if (source === 'logExercise') 
    {
      // we can change the units field to calories or just add another field for calories
      updateResult = await Collections.UserData.updateOne({ userId: userId }, { $push: { exerciseLog: { type: type, units: units, date: new Date() } } });
    } 
    // if set goal button is clicked
    else if (source === 'setGoal') 
    {
      // the actual input into the goals field needs to be changed
      updateResult = await Collections.UserData.updateOne({ userId: userId }, { $push: { goals: { type: type, units: units, date: new Date() } } });
    }
    res.status(200).json({ id: userId, error: error });
  }
  catch (err) {
    var ret = {id:'', error: 'Error inserting data.'};
    res.status(400).json(ret);
  }
  res.send();
});


app.use(express.static("./.local/vite/dist"));


export default app;