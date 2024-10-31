import { ObjectId, Document } from "mongodb";

type RespExampleType = {
  id: number;
  version: string;
  envVal: string;
};

interface UserBadgeData {
  date_earned: Date,
  badge_id: ObjectId // foreign key for Badges
}

enum BadgeTypes {
  STEPCOUNT,
  CALORIECOUNT,
  NUTRITIONSTREAK
}

interface BadgeSchema extends Document {
  _id?: ObjectId,
  badge_type: BadgeTypes,
  requirement: number
}

interface ExerciseData {
  type: string,
  calories: number,
  date: Date
}

enum GoalType {
  CALORIE,
  STEPCOUNT
}

interface GoalData {
  target: number,
  interval: Date,
  units: string
}

interface Goals extends Record<GoalType, GoalData> {

}

interface UserDataSchema extends Document {
  _id?: ObjectId,
  name: string,
  email: string,
  username: string,
  password: string,
  badges: UserBadgeData[],
  exerciseLog: ExerciseData[],
  goals: Goals
}

