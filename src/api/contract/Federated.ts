import { Request, put, del } from "superagent";

const prefix = `/api/v1/users`;

export const Federated = {
  put_self_federated: (): Request => put(`${prefix}/self/federated`),
  delete_self_federated: (provider: string): Request =>
    del(`${prefix}/self/federated/${provider}`),
};
