import { BadgeId, BadgeIdString, BadgeSchema } from "@/typings/database";
import { ENDPOINTS } from "@/typings/constants";
import { Packet } from '@/typings'

export function askForBadgeData(id: BadgeIdString): Promise<BadgeSchema> {
  if (id == null)
    return Promise.reject()
  
  return fetch(ENDPOINTS.Data.Badges, {
    method: "GET",
    priority: "low",
    body: new BadgeDataRequest(id, 'badge').serialize()
  }).then(res => res.ok ? res.json() : Promise.reject())
}

//@ts-ignore
export class BadgeDataRequest extends Packet {
  constructor(
    public id: BadgeIdString,
    public type: 'badge'
  ) {
    super()
  }
  
  // private static TYPES = {
  //   id: DESERIALIZERS.ObjectId,
  //   type: DESERIALIZERS.itself
  // }
  //
  // public static deserialize(it: object): BadgeDataRequest | null {
  //   return super.deserializerObject(it, this.TYPES)
  // }
  //
  // public static deserializeStr(it: string): BadgeDataRequest | null {
  //   return Packet.deserializer<BadgeDataRequest>(it, this.TYPES)
  // }
}