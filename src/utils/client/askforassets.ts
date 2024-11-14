import { BadgeId, BadgeSchema } from "@/typings/database";
import { ENDPOINTS } from "@/typings/constants";
import { ObjectId } from "mongodb";
import { DESERIALIZERS, Packet } from "@/typings/packets.ts";

export function askForBadgeData(id: BadgeId): Promise<BadgeSchema> {
  if (id == null)
    return Promise.reject()
  
  return fetch(ENDPOINTS.Data.Badges, {
    method: "GET",
    priority: "low",
    body: new BadgeDataRequest(id, 'badge').serialize()
  }).then(res => res.ok ? res.json() : Promise.reject())
}

export class BadgeDataRequest extends Packet {
  constructor(
    public id: ObjectId,
    public type: 'badge'
  ) {
    super()
  }
  
  private static TYPES = {
    id: DESERIALIZERS.ObjectId,
    type: DESERIALIZERS.itself
  }
  
  public static deserialize(it: string): BadgeDataRequest | null {
    return this.deserializer(it, this.TYPES)
  }
}