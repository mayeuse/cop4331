import packageJSON from "../../../package.json";
import express, { Application } from "express";
import cors from "cors";
import { Request, Response } from "express";

const app: Application = express();

app.use(express.json({ limit: "20mb" }));
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Serve a successful response. For use with wait-on
app.get("/api/v1/health", (req, res) => {
  res.send({ status: "ok" });
});

app.get(`/api/v1/version`, (req: Request, res: Response) => {
  const respObj: RespExampleType = {
    id: 1,
    version: packageJSON.version,
    envVal: process.env.ENV_VALUE as string, // sample server-side env value
  };
  res.send(respObj);
});

app.get('/api/v1/login', async (req, res, next) =>
  {
    // incoming: login, password
    // outgoing: id, firstName, lastName, error
    var error = '';
    const { login, password } = req.body;
    var id = -1;
    var fn = '';
    var ln = '';
    if( login.toLowerCase() == 'rickl' && password == 'COP4331' )
    {
      id = 1;
      fn = 'Rick';
      ln = 'Leinecker';
    }
    else
    {
      error = 'Invalid user name/password';
    }
    var ret = { id:id, firstName:fn, lastName:ln, error:error};
    res.status(200).json(ret);
  });
  

app.use(express.static("./.local/vite/dist"));

export default app;
