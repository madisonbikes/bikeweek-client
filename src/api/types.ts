import { z } from "zod";

export const eventTimeSchema = z.object({
  start: z.string(),
  end: z.string(),
});
export type EventTime = z.infer<typeof eventTimeSchema>;

export const eventStatusSchema = z.enum([
  "submitted",
  "approved",
  "cancelled",
  "pending",
]);
export type EventStatus = z.infer<typeof eventStatusSchema>;

export const eventSponsorSchema = z.object({
  name: z.string(),
  url: z.string().optional(),
});
export type EventSponsor = z.infer<typeof eventSponsorSchema>;

export const eventLocationSchema = z.object({
  name: z.string(),
  sched_venue: z.string().optional(), // defaults to name if null
  sched_address: z.string().optional(), // required for specific address info
  maps_query: z.string().optional(),
  maps_description: z.string().optional(),
  maps_placeid: z.string().optional(),
  detailed_location_description: z.string().optional(),
});
export type EventLocation = z.infer<typeof eventLocationSchema>;

export const eventDaysArraySchema = z.coerce.date().array();

export const bikeWeekEventSchema = z.object({
  id: z.coerce.number(),
  name: z.string(),
  eventUrl: z.string().optional(),
  description: z.string(),
  eventGraphicUrl: z.string().optional(),
  sponsors: eventSponsorSchema.array(),
  location: eventLocationSchema.optional(),
  eventTypes: z.string().array(),
  eventDays: eventDaysArraySchema,
  eventTimes: eventTimeSchema.array(),
  status: eventStatusSchema,
  comments: z.string().optional(),
  modifyDate: z.coerce.date(),
  createDate: z.coerce.date(),
});
export type BikeWeekEvent = z.infer<typeof bikeWeekEventSchema>;

export const mutableBikeWeekEventSchema = bikeWeekEventSchema.omit({
  modifyDate: true,
  createDate: true,
  id: true,
});
export type MutableBikeWeekEvent = z.infer<typeof mutableBikeWeekEventSchema>;

export const loginRequestSchema = z
  .object({
    username: z.string(),
    password: z.string(),
  })
  .strict();

export type LoginRequest = z.infer<typeof loginRequestSchema>;

export const loginResponseSchema = z.object({
  jwtToken: z.string(),
});
export type LoginResponse = z.infer<typeof loginResponseSchema>;

export const userSchema = z.object({
  username: z.string(),
  admin: z.boolean().default(false),
});

export const userWithPasswordSchema = userSchema.extend({
  password: z.string(),
});
