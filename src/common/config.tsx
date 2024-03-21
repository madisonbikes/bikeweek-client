import { parse } from "date-fns";

// TODO someday pull these from the backend, it already knows this stuff
export const FIRST_DAY = parse("06/01/2024", "MM/dd/yyyy", new Date());
export const LAST_DAY = parse("06/09/2024", "MM/dd/yyyy", new Date());
export const SCHED_URI = "https://madisonbikeweek2024.sched.com";
export const GF_FORM_ID = 11;
export const googleLoginEnabled = Boolean(
  import.meta.env.VITE_APP_GOOGLE_CLIENT_ID ?? "",
);
