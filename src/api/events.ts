import superagent from "superagent";
import {
  bikeWeekEventSchema,
  eventDaysArraySchema,
  BikeWeekEvent,
} from "./types";
import { AuthContextType } from "../common";

export const getAllEvents = async (auth: AuthContextType) => {
  if (!auth.state.jwt) {
    throw new Error("unauthenticated");
  }
  const result = await superagent
    .get("/api/v1/events")
    .auth(auth.state.jwt, { type: "bearer" });
  return bikeWeekEventSchema.array().parse(result.body);
};

export const getEvent = async (auth: AuthContextType, id: string) => {
  if (!auth.state.jwt) {
    throw new Error("unauthenticated");
  }
  const result = await superagent
    .get(`/api/v1/events/${id}`)
    .auth(auth.state.jwt, { type: "bearer" });
  return bikeWeekEventSchema.parse(result.body);
};

export type UpdateEventRequest = Partial<Omit<BikeWeekEvent, "id">>;

export const updateEvent = async (
  auth: AuthContextType,
  id: string,
  data: UpdateEventRequest
) => {
  if (!auth.state.jwt) {
    throw new Error("unauthenticated");
  }

  const modifiedData: Record<string, unknown> = { ...data };
  if (data.eventDays) {
    // API expects date strings in specific format
    modifiedData.eventDays = eventDaysArraySchema.parse(data.eventDays);
    console.log(
      `adjusted event days to ${JSON.stringify(modifiedData.eventDays)}`
    );
  }

  const result = await superagent
    .put(`/api/v1/events/${id}`)
    .send(modifiedData)
    .auth(auth.state.jwt, { type: "bearer" });
  return bikeWeekEventSchema.parse(result.body);
};

export const deleteEvent = async (auth: AuthContextType, id: string) => {
  if (!auth.state.jwt) {
    throw new Error("unauthenticated");
  }
  const result = await superagent
    .delete(`/api/v1/events/${id}`)
    .auth(auth.state.jwt, { type: "bearer" });
  return result.body;
};
