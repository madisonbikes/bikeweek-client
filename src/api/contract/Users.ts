import { Request, put, get } from "superagent";

const prefix = `/api/v1/users`;

export const Users = {
  users: (): Request => get(`${prefix}`),
  get_self: (): Request => get(`${prefix}/self`),
  put_self: (): Request => put(`${prefix}/self`),
};
