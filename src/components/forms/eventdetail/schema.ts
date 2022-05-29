import { BikeWeekEvent, EventLocation, EventStatus } from "../../../common";
import * as yup from "yup";

export type LocationFormData = Omit<
  EventLocation,
  "sched_venue" | "maps_description"
>;

/** this is the canonical type for form data, slightly modified from BikeWeekEvent from REST api */
export type EventFormData = Required<
  Omit<
    BikeWeekEvent,
    "id" | "modifyDate" | "createDate" | "location" | "status"
  >
> & {
  // for some reason this has to be optional to satisify yup.mixed() behavior
  status?: EventStatus;
  location: LocationFormData;
};

/** schema that validates EventFormData */
export const formSchema = yup.object({
  name: yup.string().min(10).required().ensure(),
  description: yup.string().ensure(),
  sponsors: yup
    .array(
      yup.object({
        name: yup.string().required().ensure().label("Sponsor Name"),
        url: yup.string().ensure(),
      })
    )
    .required()
    .default([]),
  comments: yup.string().ensure(),
  status: yup
    .mixed<EventStatus>()
    .oneOf(Object.values(EventStatus))
    .required()
    .default(EventStatus.SUBMITTED),
  eventUrl: yup.string().ensure().url(),
  eventGraphicUrl: yup.string().ensure().url(),
  eventDays: yup.array().required().of(yup.date().required()).default([]),
  location: yup.object({
    name: yup.string().min(5).ensure().required(),
    sched_address: yup.string().ensure(),
    maps_query: yup.string().ensure(),
    maps_placeid: yup.string().ensure(),
    detailed_location_description: yup.string().ensure(),
  }),
  eventTimes: yup
    .array(
      yup.object({
        start: yup.string().required().default("").label("Start Time"),
        end: yup.string().default(""),
      })
    )
    .required()
    .default([]),
  eventTypes: yup
    .array(yup.string().lowercase().min(1).required().label("Event Type Name"))
    .required()
    .default([]),
});
