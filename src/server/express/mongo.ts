import { Collection, DropCollectionOptions, InsertOneResult, MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
import { UserDataSchema, BadgeSchema } from "@/typings/types";
import { TODO } from "@xdc/todo";
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
    export type Schema = BadgeSchema
    
    const COLLECTION: Collection<Schema> = DATABASE.collection("Badges")
    // ^ don't use this directly!!! make a function and export it instead like below, in case something has to be changed
    
    
    export async function insert(obj: Schema) {
      return COLLECTION.insertOne(obj)
    }
    
    export async function get(query: any): Promise<Schema> {
      return TODO(query)
    }
  }
  
  export namespace UserData {
    export type Schema = UserDataSchema
    
    
    const COLLECTION: Collection<Schema> = DATABASE.collection("Users")
    // ^ don't use this directly!!! make a function and export it instead like below, in case something has to be changed
    
    
    export async function insert(obj: Schema): Promise<InsertOneResult<Document>> {
      return COLLECTION.insertOne(obj)
    }
    
    export async function get(query: any): Promise<Schema> {
      return TODO(query)
    }
    
    export async function find(query: any) {
      return COLLECTION.find(query)
    }

    export async function drop(query: DropCollectionOptions): Promise<boolean> {
      return COLLECTION.drop(query)
    }
  }
}
