import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import superagent from "superagent";
import { useAuth } from "../common";
import { BikeWeekEvent } from "../common/event";

export const EventDetail = () => {
  const { id } = useParams();
  const auth = useAuth();
  const { isLoading, isError, data, error } = useQuery<BikeWeekEvent, Error>(
    ["events", id],
    async () => {
      const result = await superagent
        .get(`/api/v1/events/${id}`)
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        .auth(auth.state.jwt!, { type: "bearer" });
      return result.body;
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <pre>{JSON.stringify(data, undefined, "  ")}</pre>
    </div>
  );
};

export default EventDetail;
