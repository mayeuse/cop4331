import { ExerciseType } from "@/typings/database/userdata";
import { ObjectId } from "mongodb";

export type Serializer = [ InstanceType<any>, Function ]
export const SERIALIZERS: Serializer[] = [
  [ Date, Date.prototype.toUTCString ],
  [ ObjectId, ObjectId.prototype.toHexString ],
];

export const DESERIALIZERS = {
  itself: <T>(x: T) => x,
  ObjectId: ObjectId.createFromHexString,
  Date: Date.parse,
};


export abstract class Packet {
  public serialize(additionalSerializers?: Serializer[]): string {
    return JSON.stringify(this, (_key, value) => {
      for (const [ type, serializer ] of SERIALIZERS) {
        if (value instanceof type) {
          return serializer.bind(value)();
        }
      }
      if (additionalSerializers) {
        for (const [ type, serializer ] of additionalSerializers) {
          if (value instanceof type) {
            return serializer.bind(value)();
          }
        }
      }
      return value;
    });
  }
  
  static deserializer<T>(it: string, types?: Record<string, Function>): T | null {
    if (!types)
      return JSON.parse(it);
    
    try {
      return JSON.parse(it, (key, value) => {
        if (!(key in types)) {
          throw "";
        }
        
        // @ts-ignore
        return types[key](value);
      });
    } catch (e) {
      return null;
    }
  }
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
  
  public static deserialize(it: string): ILoginPacket {
    return JSON.parse(it);
  }
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
  
  public static deserialize(it: string): IRegisterPacket {
    return JSON.parse(it)
  }
}


export interface IAddExercisePacket {
  userId: ObjectId,
  calories: number,
  date: Date,
  type: ExerciseType,
}

export class AddExercisePacket extends Packet implements IAddExercisePacket {
  constructor(
    public userId: ObjectId,
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
  
  private static TYPES = {
    "userId": DESERIALIZERS.ObjectId,
    "date": DESERIALIZERS.Date,
    "type": DESERIALIZERS.itself,
    "calories": DESERIALIZERS.itself,
  };
  
  public static deserialize(it: string): IAddExercisePacket | null {
    return Packet.deserializer<IAddExercisePacket>(it, this.TYPES);
  }
}

