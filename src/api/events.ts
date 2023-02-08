import superagent from "superagent";
import { BikeWeekEventSchema, EventDaysArraySchema } from "../api/event";
import { BikeWeekEvent } from "../api/event";
import { AuthContextType } from "../common";

export const getAllEvents = async (
  auth: AuthContextType
): Promise<BikeWeekEvent[]> => {
  if (!auth.state.jwt) {
    throw new Error("unauthenticated");
  }
  const result = await superagent
    .get("/api/v1/events")
    .auth(auth.state.jwt, { type: "bearer" });
  return BikeWeekEventSchema.array().parseAsync(result.body);
};

export const getEvent = async (
  auth: AuthContextType,
  id: string
): Promise<BikeWeekEvent> => {
  if (!auth.state.jwt) {
    throw new Error("unauthenticated");
  }
  const result = await superagent
    .get(`/api/v1/events/${id}`)
    .auth(auth.state.jwt, { type: "bearer" });
  return BikeWeekEventSchema.parseAsync(result.body);
};

export type UpdateEventRequest = Partial<BikeWeekEvent>;

export const updateEvent = async (
  auth: AuthContextType,
  id: string,
  data: UpdateEventRequest
): Promise<BikeWeekEvent> => {
  if (!auth.state.jwt) {
    throw new Error("unauthenticated");
  }

  const modifiedData: Record<string, unknown> = { ...data };
  if (data.eventDays) {
    // API expects date strings in specific format
    modifiedData.eventDays = EventDaysArraySchema.parse(data.eventDays);
    console.log(
      `adjusted event days to ${JSON.stringify(modifiedData.eventDays)}`
    );
  }

  const result = await superagent
    .put(`/api/v1/events/${id}`)
    .send(modifiedData)
    .auth(auth.state.jwt, { type: "bearer" });
  return BikeWeekEventSchema.parseAsync(result.body);
};

export const deleteEvent = async (
  auth: AuthContextType,
  id: string
): Promise<void> => {
  if (!auth.state.jwt) {
    throw new Error("unauthenticated");
  }
  const result = await superagent
    .delete(`/api/v1/events/${id}`)
    .auth(auth.state.jwt, { type: "bearer" });
  return result.body;
};
