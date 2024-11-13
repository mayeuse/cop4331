import { Document, ObjectId } from "mongodb";

declare type BadgeId = ObjectId

interface BadgeSchema extends Document {
    _id?: BadgeId,
    badge_type: BadgeTypes,
    requirement: number
}

enum BadgeTypes {
    STEPCOUNT,
    CALORIECOUNT,
    NUTRITIONSTREAK
}