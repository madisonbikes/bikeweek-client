import { StatusCodes } from "http-status-codes";
import { AuthState } from "../common";
import { AddFederatedIdentity, FederatedProvider } from "./contract";
import { Federated } from "./contract/Federated";

export const getGoogleFederatedId = (state: AuthState) => {
  return (
    state.federated?.find((v) => v.provider === "google")?.federatedId ?? ""
  );
};

export const linkFederatedIdentity = async (data: AddFederatedIdentity) => {
  const response = await Federated.put_self_federated()
    .send(data)
    .ok(
      (res) =>
        res.status === StatusCodes.OK || res.status === StatusCodes.FORBIDDEN
    );
  if (response.statusCode === StatusCodes.FORBIDDEN) {
    return false;
  } else {
    return true;
  }
};

export const unlinkFederatedIdentity = async (provider: FederatedProvider) => {
  const response = await Federated.delete_self_federated(provider).ok(
    (res) =>
      res.status === StatusCodes.OK || res.status === StatusCodes.FORBIDDEN
  );
  if (response.statusCode === StatusCodes.FORBIDDEN) {
    return false;
  } else {
    return true;
  }
};
