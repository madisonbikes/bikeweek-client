// TODO someday pull these from the backend, it already knows this stuff
export const FIRST_DAY = "06/01/2024";
export const LAST_DAY = "06/09/2024";
export const SCHED_URI = "https://madisonbikeweek2024.sched.com";
export const GF_FORM_ID = 11;
export const googleLoginEnabled = Boolean(
  process.env.VITE_APP_GOOGLE_CLIENT_ID ?? "",
);
