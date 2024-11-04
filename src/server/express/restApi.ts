import packageJSON from "../../../package.json";
import express, { Application } from "express";
import cors from "cors";
import { Request, Response } from "express";
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
    let error = '';
    const { login, password } = req.body;
    const results = await (await Collections.UserData.find({ username: login, password: password })).toArray();
    let id = '';
    let name = '';
    if( results.length > 0 )
    {
      id = results[0]._id.toHexString();
      name = results[0].name;
    }
    var ret = { id:id, name:name, error:''};
    res.status(200).json(ret);
  });
  
app.post('/api/v1/register', async (req, res, next) =>
  {
    // incoming: name, email, login, password
    // outgoing: id
    let error = '';
    const { name, email, login, password } = req.body;
    const results = await (await Collections.UserData.insert({ name: name, email: email, username: login, password: password, badges: [], exerciseLog: [], goals: {}}));
    var ret = {id:results.insertedId.toHexString()};
    res.status(200).json(ret);
  });


app.use(express.static("./.local/vite/dist"));

export default app;