import { Request, put, get, del } from "superagent";

const prefix = `/api/v1/users`;

export const Users = {
  users: (): Request => get(prefix),
  get_self: (): Request => get(`${prefix}/self`),
  put_self_password: (): Request => put(`${prefix}/self/password`),
  put_self_federated: (): Request => put(`${prefix}/self/federated`),
  delete_self_federated: (provider: string): Request =>
    del(`${prefix}/self/federated/${provider}`),
};
