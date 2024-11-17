import { UserDataSchema as _UserDataSchema, UserDataId as _UserDataId } from "./userdata";
import { BadgeSchema as _BadgeSchema, BadgeId as _BadgeId } from "./badges";
import { type ObjectId } from "mongodb";

/* Top level database schemas */
export type UserDataSchema = _UserDataSchema
export type BadgeSchema = _BadgeSchema

/* For typechecking as foreign keys in other schemas */
export type UserDataId = _UserDataId
export type UserDataIdString = ReturnType<ObjectId['toJSON']>
export type BadgeId = _BadgeId
export type BadgeIdString = ReturnType<ObjectId['toJSON']>

/* Re-export the subfiles under these names */
export * as UserData from './userdata'
export * as Badges from './badges'

