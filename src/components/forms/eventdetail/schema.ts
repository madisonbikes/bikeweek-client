import {
  BikeWeekEvent,
  EventLocation,
  eventStatusSchema,
  EventStatus,
} from "../../../api/contract/types";
import * as yup from "yup";

export type LocationFormData = Omit<
  EventLocation,
  "sched_venue" | "maps_description"
>;

/** this is the canonical type for form data, slightly modified from BikeWeekEvent from REST api */
export type EventFormData = Required<
  Omit<
    BikeWeekEvent,
    "id" | "modifyDate" | "createDate" | "location" | "status" | "eventDays"
  >
> & {
  // for some reason this has to be optional to satisify yup.mixed() behavior
  status?: EventStatus;
  location: LocationFormData;
  eventDays: Date[];
};

const amPmTimeRegex = /^\s*((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm])\s*$)/;
const timeRegexOptions = {
  excludeEmptyString: true,
  message: "Times should be supplied in US AM/PM format",
};

/** schema that validates EventFormData */
export const FormSchema = yup.object({
  name: yup.string().min(10).required().ensure().trim(),
  description: yup.string().ensure(),
  sponsors: yup
    .array(
      yup.object({
        name: yup.string().required().ensure().label("Sponsor Name").trim(),
        url: yup.string().ensure().url().trim(),
      }),
    )
    .required()
    .default([]),
  comments: yup.string().ensure(),
  status: yup
    .mixed<EventStatus>()
    .oneOf(Object.values(eventStatusSchema.Values))
    .required()
    .default(eventStatusSchema.Enum.submitted),
  eventUrl: yup.string().ensure().url().trim(),
  eventGraphicUrl: yup.string().ensure().url().trim(),
  eventDays: yup.array().required().of(yup.date().required()).default([]),
  location: yup.object({
    name: yup.string().min(5).ensure().required().trim(),
    sched_address: yup.string().ensure(),
    maps_query: yup.string().ensure(),
    maps_placeid: yup.string().ensure(),
    detailed_location_description: yup.string().ensure(),
  }),
  eventTimes: yup
    .array(
      yup.object({
        start: yup
          .string()
          .matches(amPmTimeRegex, timeRegexOptions)
          .required()
          .trim()
          .default("")
          .label("Start Time"),
        end: yup
          .string()
          .matches(amPmTimeRegex, timeRegexOptions)
          .default("")
          .trim(),
      }),
    )
    .required()
    .default([]),
  eventTypes: yup
    .array(
      yup
        .string()
        .lowercase()
        .min(1)
        .required()
        .trim()
        .label("Event Type Name"),
    )
    .required()
    .default([]),
});

export type FormType = yup.InferType<typeof FormSchema>;
