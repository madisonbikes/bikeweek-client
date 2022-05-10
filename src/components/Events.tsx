import { Link } from "@mui/material";
import { useQuery } from "react-query";
import superagent from "superagent";
import { useAuth } from "../common";
import { BikeWeekEvent } from "../common/event";
import { Link as RouterLink } from "react-router-dom";

export const Events = () => {
  const auth = useAuth();
  const { isLoading, isError, data, error } = useQuery<BikeWeekEvent[], Error>(
    "events",
    async () => {
      const result = await superagent
        .get("/api/v1/events")
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
    <>
      <ul>
        {data!.map((event) => (
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
