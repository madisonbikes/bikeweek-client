import { parse } from "date-fns";

// TODO someday pull these from the backend, it already knows this stuff
export const FIRST_DAY = parse("05/31/2025", "MM/dd/yyyy", new Date());
export const LAST_DAY = parse("06/08/2025", "MM/dd/yyyy", new Date());
export const SCHED_URI = "https://madisonbikeweek2025.sched.com";
export const GF_FORM_ID = 13;
export const googleLoginEnabled = Boolean(
  import.meta.env.VITE_APP_GOOGLE_CLIENT_ID ?? "",
);
