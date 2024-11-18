import {
  Collection,
  Document,
  DropCollectionOptions, Filter,
  InsertOneResult,
  MongoClient,
  ServerApiVersion, UpdateFilter,
  UpdateResult,
} from "mongodb";
import dotenv from "dotenv";
import { TODO } from "@xdc/todo";
import { BadgeSchema, UserDataId } from "@/typings/database";
import { ExerciseData, GoalData, Goals, GoalType, UserDataSchema } from "@/typings/database/userdata";
import { ArrayElement, KeysYieldingArray } from "@/typings/util.ts";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URL!, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const DATABASE = client.db("Team21DB");

export namespace Collections {
  export namespace Badges {
    export type Schema = BadgeSchema
    
    const COLLECTION: Collection<Schema> = DATABASE.collection("Badges");
    // ^ don't use this directly!!! make a function and export it instead like below, in case something has to be changed
    
    
    export async function insert(obj: Schema) {
      return COLLECTION.insertOne(obj);
    }
    
    export async function get(query: Partial<Schema>): Promise<Schema> {
      return (await COLLECTION.find(query).limit(1).toArray())[0];
    }
  }
  
  export namespace UserData {
    export type Schema = UserDataSchema
    
    
    const COLLECTION: Collection<Schema> = DATABASE.collection("Users");
    
    // ^ don't use this directly!!! make a function and export it instead like below, in case something has to be changed
    
    
    export async function insert(obj: Schema): Promise<InsertOneResult<Document>> {
      return COLLECTION.insertOne(obj);
    }
    
    export async function updateGoal(userId: UserDataId, type: GoalType, goal: GoalData) {
      const x: Goals = {}
      // @ts-ignore
      x[`goals.${type}`] = goal
      
      return Collections.UserData.updateOne({ _id: userId }, { $set: x }); // TODO make sure this works for pushing the new value into the object
    }
    
    export async function pushExercise(userId: UserDataId, exercise: ExerciseData) {
      return addToArray(userId, 'exerciseLog', exercise);
    }
    
    export async function get(query: any): Promise<Schema> {
      return TODO(query);
    }
    
    export async function find(query: Partial<Schema>) {
      return COLLECTION.find(query);
    }

    export async function findOne(query: Partial<Schema>) {
      return COLLECTION.findOne(query)
    }

    
    export async function drop(query: DropCollectionOptions): Promise<boolean> {
      return COLLECTION.drop(query);
    }
    
    export async function updateOne(filter: Filter<Schema>, update: UpdateFilter<Schema>): Promise<UpdateResult> {
      return COLLECTION.updateOne(filter, update);
    }
    
    export async function addToArray<K extends KeysYieldingArray<Schema> & keyof UserDataSchema>(_id: UserDataId, location: K, toPush: ArrayElement<UserDataSchema[K]>) {
      const x: any = {};
      x[location] = toPush;
      return COLLECTION.updateOne({ _id }, { $push: x });
    }
  }
}
