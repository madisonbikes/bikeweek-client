import superagent from "superagent";
import { bikeWeekEventSchema, MutateBikeWeekEvent } from "./contract/types";

const getAllEvents = async () => {
  const result = await superagent.get("/api/v1/events");
  return bikeWeekEventSchema.array().parse(result.body);
};

const getEvent = async (id: number) => {
  const result = await superagent.get(`/api/v1/events/${id}`);
  return bikeWeekEventSchema.parse(result.body);
};

type UpdateEventRequest = Partial<MutateBikeWeekEvent>;

const updateEvent = async (id: number, data: UpdateEventRequest) => {
  const result = await superagent.put(`/api/v1/events/${id}`).send(data);
  return bikeWeekEventSchema.parse(result.body);
};

const deleteEvent = async (id: number) => {
  await superagent.delete(`/api/v1/events/${id}`);
};

export default { getAllEvents, getEvent, updateEvent, deleteEvent };
