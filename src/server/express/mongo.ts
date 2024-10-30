import { MongoClient, ServerApiVersion } from 'mongodb'
import dotenv from "dotenv";
import { UserDataSchema, BadgeSchema } from "@/typings/types";
dotenv.config();


const client = new MongoClient(process.env.MONGO_URL!!, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export const DATABASE = client.db("Team21DB")

export namespace Collections {
  export namespace Badges {
    export const COLLECTION = DATABASE.collection("Badges")
    export type Schema = BadgeSchema
  }
  export namespace UserData {
    export const COLLECTION = DATABASE.collection("Users")
    export type Schema = UserDataSchema
  }
}
