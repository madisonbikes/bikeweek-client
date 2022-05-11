import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getEvent } from "../api/events";
import { useAuth } from "../common";
import { BikeWeekEvent } from "../common/event";

export const EventDetail = () => {
  const { id } = useParams();
  if (!id) {
    throw new Error("requires id param");
  }

  const auth = useAuth();
  const { isLoading, isError, data, error } = useQuery<BikeWeekEvent, Error>(
    ["events", id],
    () => {
      return getEvent(auth, id);
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
