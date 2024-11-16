import { ObjectId } from "mongodb";
import { BadgeTypes } from "@/typings/database/badges";
import {
    ExerciseData,
    ExerciseType,
    GoalData,
    Goals,
    GoalType,
    Intervals,
    UserBadgeData,
    UserDataSchema,
} from "@/typings/database/userdata";

import { BadgeSchema } from "@/typings/database";
import CalorieGoal = GoalDataImpls.CalorieGoal;

export class UserDataImpl implements UserDataSchema {
    public _id?: ObjectId = undefined;
    public email: string = '';
    public badges: UserBadgeData[] = [];
    public exerciseLog: ExerciseData[] = [];
    public goals: Goals = {};
    
    /**
     * @param name The user's name
     * @param username The user's login identifier
     * @param password The user's password (hashed)
     * @param params For manually specifying other properties, like `{ badges: [badge1, badge2], goals: { ... } }`
     */
    constructor(
        public name: string, // required properties
        public username: string,
        public password: string,
        params: Partial<UserDataImpl> // any other optional properties, bundled as an object
    ) {
        Object.assign(this, params) // assigns any properties in the `params` object to `this`
    }

    /**
     * Helper method to make one from just a single object instead of having to destructure it yourself
     * @param params
     */
    static of(params: Partial<UserDataImpl> & { name: string, username: string, password: string }) {
        return new UserDataImpl(params.name, params.username, params.password, params);
    }
}

export class ExerciseDataImpl implements ExerciseData {
    constructor(
        public type: ExerciseType,
        public calories: number,
        public date: Date
    ) {}
    
    static of(params: ExerciseData) {
        return new ExerciseDataImpl(params.type, params.calories, params.date);
    }
}

export class GoalDataImpl implements GoalData {
    target: number;
    units: string;
    interval: Date;
    
    constructor(target: number, units: string, interval: Date = Intervals.WEEKLY) {
        this.target = target;
        this.units = units;
        this.interval = interval;
    }
    
    static forType(type: GoalType) {
        switch (type) {
            case GoalType.CALORIE:
                return GoalDataImpls.CalorieGoal
            case GoalType.STEPCOUNT:
                return GoalDataImpls.StepGoal
        }
    }
}


export namespace GoalDataImpls {
    export class StepGoal extends GoalDataImpl {
        constructor(target: number, interval: Date) {
            super(target, "steps", interval);
        }
    }

    export class DistanceGoal extends GoalDataImpl {
        constructor(target: number, interval: Date) {
            super(target, 'miles', interval);
        }
    }
    
    export class CalorieGoal extends GoalDataImpl {
        constructor(target: number, interval: Date) {
            super(target, 'calories', interval);
        }
    }
}

export class BadgeObjectImpl implements BadgeSchema {
    
    constructor(
      public badge_type: BadgeTypes,
      public name: string,
      public desc: string,
      public requirement: number,
    ) {}
    
    
}

export class UserBadgeDataImpl implements UserBadgeData {
    badge_id: ObjectId;
    date_earned: Date;
    
    constructor(badge_id: ObjectId, date_earned: Date) {
        this.badge_id = badge_id;
        this.date_earned = date_earned;
    }
}