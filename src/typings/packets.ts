import { ExerciseType } from "@/typings/database/userdata";
import { ObjectId } from "mongodb";

export type SerializedObjectId = ReturnType<ObjectId["toHexString"]>
export type SerializedDate = ReturnType<Date["getUTCDate"]>


export type Serializer = [ InstanceType<any>, Function ]
export const SERIALIZERS: Serializer[] = [
  [ Date, Date.prototype.toUTCString ],
  [ ObjectId, ObjectId.prototype.toHexString ],
];

export const DESERIALIZERS = {
  itself: <T>(x: T) => x,
  ObjectId: ObjectId.createFromHexString,
  Date: Date.parse
}

export class LoginPacket {
  // define the properties it'll have
  public login: string;
  public password: string;
  
  // make a constructor
  constructor(login: string, password: string) {
    this.login = login;
    this.password = password;
  }
}

export class RegisterPacket {
  // define the properties it'll have
  public name: string;
  public email: string;
  public login: string;
  public password: string;
  
  // make a constructor
  constructor(name: string, email: string, login: string, password: string) {
    this.name = name;
    this.email = email;
    this.login = login;
    this.password = password;
  }
}

export interface IPacket extends Record<string, any> {}

export abstract class Packet implements IPacket {
  public serialize(serializers?: Serializer[]): string {
    return JSON.stringify(this, (_key, value) => {
      for (const [ type, serializer ] of SERIALIZERS) {
        if (value instanceof type) {
          return serializer.bind(value)();
        }
      }
      if (serializers) {
        for (const [ type, serializer ] of serializers) {
          if (value instanceof type) {
            return serializer.bind(value)();
          }
        }
      }
      return value;
    });
  }
  
  protected static deserializer<T extends Packet>(it: string, types: Omit<Record<keyof T, Function>, 'serialize'>) : T | null {
    try {
      return JSON.parse(it, (key, value) => {
        if (!(key in types)) {
          throw "";
        }
        
        // @ts-ignore
        return types[key](value)
      })
    } catch (e) {
      return null;
    }
  }
}

export interface IAddExercisePacket extends IPacket {
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
    'type': DESERIALIZERS.itself,
    'calories': DESERIALIZERS.itself,
  }
  
  public static deserialize(it: string): AddExercisePacket | null {
    return super.deserializer<AddExercisePacket>(it, this.TYPES)
  }
}