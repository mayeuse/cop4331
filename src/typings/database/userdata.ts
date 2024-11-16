import { Document, ObjectId } from "mongodb";

import { BadgeId } from "@/typings/database/index";

export * as Impl from "./impl/userdataimpl"

export type UserDataId = ObjectId

export interface UserDataSchema extends Document {
    _id?: UserDataId,
    name: string,
    email: string,
    username: string,
    password: string,
    badges: UserBadgeData[],
    exerciseLog: ExerciseData[],
    goals: Goals
}

export interface UserBadgeData {
    date_earned: Date,
    badge_id: BadgeId // foreign key for Badges
}


export type ExerciseType = string; // in case we make it an enum later

export interface ExerciseData {
    type: ExerciseType,
    calories: number,
    date: Date
}

export enum GoalType {
    CALORIE = 'calorie',
    STEPCOUNT = 'stepcount'
}

export interface GoalData {
    target: number,
    /**
     * How long the goal is for, e.g. 1 week, 1 month, 1 year, centered on epoch.
     * Probably need to change this into an enum of like DAY, WEEK, MONTH, etc.
     */
    interval: Date,
    units: string
}

export type Goals = {
    [key in GoalType]?: GoalData;
};
