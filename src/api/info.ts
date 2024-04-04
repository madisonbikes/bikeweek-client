import { useQuery } from "@tanstack/react-query";
import { getInfoSchema } from "./contract";
import { Info } from "./contract/Info";

export const info = async () => {
  const response = await Info.info()
    .ok((res) => res.status === 200 || res.status === 401)
    .send();

  return getInfoSchema.parse(response.body);
};

export const useQueryInfo = () => {
  return useQuery({
    queryKey: ["info"],
    queryFn: info,
  });
};
