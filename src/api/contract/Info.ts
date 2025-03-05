import { Request, get } from "superagent";

const prefix = `/api/v1/info`;

export const Info = {
  info: (): Request => get(prefix),
};
