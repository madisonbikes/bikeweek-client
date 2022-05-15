import { parseISO } from "date-fns";
import superagent from "superagent";
import { AuthContextType } from "../common";
import { BikeWeekEvent } from "../common";

export const getAllEvents = async (
  auth: AuthContextType
): Promise<BikeWeekEvent[]> => {
  if (!auth.state.jwt) {
    throw new Error("unauthenticated");
  }
  const result = await superagent
    .get("/api/v1/events")
    .auth(auth.state.jwt, { type: "bearer" });
  const events: BikeWeekEvent[] = result.body;
  return events.map((event) => {
    return normalizeEvent(event);
  });
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
  const event = normalizeEvent(result.body);
  return event;
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
  const result = await superagent
    .put(`/api/v1/events/${id}`)
    .send(data)
    .auth(auth.state.jwt, { type: "bearer" });
  return result.body;
};

const normalizeEvent = (event: BikeWeekEvent): BikeWeekEvent => {
  const parsedCreateDate = parseISO(event.createDate as unknown as string);
  const parsedModifyDate = parseISO(event.modifyDate as unknown as string);

  // days come as array of strings, we want array of dates
  const days: string[] = event.eventDays as unknown as string[];
  const parsedDays = days.map((v) => parseISO(v));

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { createDate, modifyDate, eventDays, ...rest } = event;
  return {
    createDate: parsedCreateDate,
    modifyDate: parsedModifyDate,
    eventDays: parsedDays,
    ...rest,
  };
};
