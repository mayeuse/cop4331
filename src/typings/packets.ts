import { ExerciseType, GoalData, GoalType } from "@/typings/database/userdata";
import { UserDataIdString } from "@/typings/database";


// export type Serializer = [ InstanceType<any>, Function ]
// export const SERIALIZERS: Serializer[] = [
//   [ Date, Date.prototype.toUTCString ],
//   [ ObjectId, ObjectId.prototype.toHexString ],
// ];
//
// export const DESERIALIZERS = {
//   itself: <T>(x: T) => x,
//   ObjectId: ObjectId.createFromHexString,
//   Date: Date.parse,
// };

export abstract class Packet {
  public serialize(): string {
    return JSON.stringify(this)//, (_key, value) => {
    //   for (const [ type, serializer ] of SERIALIZERS) {
    //     if (value instanceof type) {
    //       return serializer.bind(value)();
    //     }
    //   }
    //   if (additionalSerializers) {
    //     for (const [ type, serializer ] of additionalSerializers) {
    //       if (value instanceof type) {
    //         return serializer.bind(value)();
    //       }
    //     }
    //   }
    //   return value;
    // });
  }
  
  // static deserializer<T>(it: string, types?: Record<string, Function>): T | null {
  //   if (!types)
  //     return JSON.parse(it);
  //
  //   try {
  //     return JSON.parse(it, (key, value) => {
  //       if (!(key in types)) {
  //         throw "";
  //       }
  //
  //       // @ts-ignore
  //       return types[key](value);
  //     });
  //   } catch (e) {
  //     return null;
  //   }
  // }
  //
  // static deserializerObject<T>(it: Record<string, any>, deserializers?: Record<string, Function>): T | null {
  //   if (deserializers) {
  //     for (let key in it) {
  //       if (!(key in deserializers)) {
  //         return null;
  //       }
  //       it[key] = deserializers[key](it[key])
  //     }
  //   }
  //   return (it as T);
  // }
}

export interface ILoginPacket {
  login: string;
  password: string;
}

export class LoginPacket extends Packet {
  // define the properties it'll have
  public login: string;
  public password: string;
  
  // make a constructor
  constructor(login: string, password: string) {
    super();
    this.login = login;
    this.password = password;
  }
  
  // public static deserialize(it: string): ILoginPacket {
  //   return JSON.parse(it);
  // }
}

export interface IRegisterPacket {
  name: string;
  email: string;
  login: string;
  password: string;
}

export class RegisterPacket extends Packet implements IRegisterPacket {
  // define the properties it'll have
  public name: string;
  public email: string;
  public login: string;
  public password: string;
  
  // make a constructor
  constructor(name: string, email: string, login: string, password: string) {
    super();
    this.name = name;
    this.email = email;
    this.login = login;
    this.password = password;
  }
  
  // public static deserializeStr(it: string): IRegisterPacket {
  //   return JSON.parse(it)
  // }
  //
  // public static deserialize(it: object): IRegisterPacket {
  //   return it as IRegisterPacket
  // }
}

export interface IResetPasswordPacket {
  newPassword: string,
  confirmPassword: string,
}


export interface IAddExercisePacket {
  userId: UserDataIdString,
  calories: number,
  date: Date,
  type: ExerciseType,
}

export class AddExercisePacket extends Packet implements IAddExercisePacket {
  constructor(
    public userId: UserDataIdString,
    public calories: number,
    public date: Date,
    public type: ExerciseType,
  ) {
    super();
  }
  
  public static is(it: any): it is IAddExercisePacket {
    return it instanceof AddExercisePacket
      || (typeof it === "object" && "userId" in it && "calories" in it && "type" in it);
  }
  
  // private static TYPES = {
  //   "userId": DESERIALIZERS.ObjectId,
  //   "date": DESERIALIZERS.Date,
  //   "type": DESERIALIZERS.itself,
  //   "calories": DESERIALIZERS.itself,
  // };
  //
  // public static deserialize(it: object): IAddExercisePacket | null {
  //   return Packet.deserializerObject<IAddExercisePacket>(it, this.TYPES);
  // }
  //
  // public static deserializeStr(it: string): IAddExercisePacket | null {
  //   return Packet.deserializer<IAddExercisePacket>(it, this.TYPES);
  // }
}

export interface IAddGoalPacket extends GoalData {
  type: GoalType,
  userId: UserDataIdString
}

export class AddGoalPacket extends Packet implements IAddGoalPacket {
  public userId: UserDataIdString;
  public type: GoalType;
  public target: number;
  public units: string;
  public interval: Date;
  
  constructor(userId: UserDataIdString, type: GoalType, target: number, units: string, interval: Date) {
    super();
    this.userId = userId;
    this.type = type;
    this.target = target;
    this.units = units;
    this.interval = interval;
  }
  
  // static TYPES = {
  //   userId: DESERIALIZERS.ObjectId,
  //   type: (s: string) => GoalType[s as keyof typeof GoalType],
  //   interval: DESERIALIZERS.Date,
  //   units: DESERIALIZERS.itself,
  //   target: DESERIALIZERS.itself
  // }
  //
  // public static deserialize(it: object): IAddGoalPacket | null {
  //   return super.deserializerObject<IAddGoalPacket>(it, this.TYPES);
  // }
  //
  // public static deserializeStr(it: string): IAddGoalPacket | null {
  //   return this.deserializer<IAddGoalPacket>(it, )
  // }
}