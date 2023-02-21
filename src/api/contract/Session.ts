import { Request, post, get } from "superagent";

const prefix = `/api/v1/session`;

export const Session = {
  login: (): Request => post(`${prefix}/login`),
  logout: (): Request => post(`${prefix}/logout`),
  info: (): Request => get(`${prefix}/info`),
  federated_google_login: (): Request =>
    post(`${prefix}/federated/google/login`),
};
