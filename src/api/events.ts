import superagent from "superagent";
import { bikeWeekEventSchema, MutateBikeWeekEvent } from "./contract/types";
import { AuthContextType } from "../common";

export const getAllEvents = async (auth: AuthContextType) => {
  if (!auth.state.authenticated) {
    throw new Error("unauthenticated");
  }
  const result = await superagent.get("/api/v1/events");
  return bikeWeekEventSchema.array().parse(result.body);
};

export const getEvent = async (auth: AuthContextType, id: number) => {
  if (!auth.state.authenticated) {
    throw new Error("unauthenticated");
  }
  const result = await superagent.get(`/api/v1/events/${id}`);
  return bikeWeekEventSchema.parse(result.body);
};

export type UpdateEventRequest = Partial<MutateBikeWeekEvent>;

export const updateEvent = async (
  auth: AuthContextType,
  id: number,
  data: UpdateEventRequest
) => {
  if (!auth.state.authenticated) {
    throw new Error("unauthenticated");
  }

  const result = await superagent.put(`/api/v1/events/${id}`).send(data);
  return bikeWeekEventSchema.parse(result.body);
};

export const deleteEvent = async (auth: AuthContextType, id: number) => {
  if (!auth.state.authenticated) {
    throw new Error("unauthenticated");
  }
  await superagent.delete(`/api/v1/events/${id}`);
};
