import superagent from "superagent";
import { AuthContextType } from "../common";
import { BikeWeekEvent } from "../common/event";

export const getAllEvents = async (
  auth: AuthContextType
): Promise<BikeWeekEvent[]> => {
  if (!auth.state.jwt) {
    throw new Error("unauthenticated");
  }
  const result = await superagent
    .get("/api/v1/events")
    .auth(auth.state.jwt, { type: "bearer" });
  return result.body;
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
  return result.body;
};
