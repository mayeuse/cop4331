import { Document, ObjectId } from "mongodb";

export declare type BadgeId = ObjectId

export interface BadgeSchema extends Document {
    _id?: BadgeId,
    name: string,
    desc: string,
    badge_type: BadgeTypes,
    requirement: number,
    img?: string
}

export enum BadgeTypes {
    STEPCOUNT,
    CALORIECOUNT,
    NUTRITIONSTREAK
}