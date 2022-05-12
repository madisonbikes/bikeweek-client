import { Link } from "@mui/material";
import { useQuery } from "react-query";
import { useAuth } from "../common";
import { BikeWeekEvent } from "../common";
import { Link as RouterLink } from "react-router-dom";
import { getAllEvents } from "../api/events";

export const Events = () => {
  const auth = useAuth();
  const { isLoading, isError, data, error } = useQuery<BikeWeekEvent[], Error>(
    "events",
    () => {
      return getAllEvents(auth);
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <h2>Events</h2>
      <ul>
        {data?.map((event) => (
          <li key={event.id}>
            <Link component={RouterLink} to={`/events/${event.id}`}>
              {event.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Events;
