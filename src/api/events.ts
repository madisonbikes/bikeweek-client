import { parseISO, formatISO } from "date-fns";
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

  // for event days, only send the date (not time) to avoid timezone issues on backend
  // FIXME could move this to backend too but need to make sure stringified version sent always includes correct date on client
  const modifiedData: Record<string, unknown> = { ...data };
  if (data.eventDays) {
    modifiedData.eventDays = data.eventDays.map((day: Date) => {
      return formatISO(day, {
        representation: "date",
      });
    });
    console.log(
      `adjusted event days to ${JSON.stringify(modifiedData.eventDays)}`
    );
  }

  const result = await superagent
    .put(`/api/v1/events/${id}`)
    .send(modifiedData)
    .auth(auth.state.jwt, { type: "bearer" });
  return result.body;
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
