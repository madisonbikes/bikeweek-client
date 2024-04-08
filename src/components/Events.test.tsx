import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Events } from ".";
import { AuthProvider } from "../common";
import { MemoryRouter } from "react-router-dom";
import { BikeWeekEvent } from "../api/contract";

vi.mock("./common", () => ({
  useAuth: () => {
    return {
      state: { authenticated: true },
      setState: () => {
        return undefined;
      },
    };
  },
}));
vi.mock("../api/events", () => {
  return {
    default: {
      getAllEvents: (): BikeWeekEvent[] => {
        return [
          {
            id: 1,
            name: "Test Event",
            description: "",
            status: "submitted",
            sponsors: [],
            eventTypes: [],
            eventDays: [],
            eventTimes: [],
            modifyDate: new Date(),
            createDate: new Date(),
          },
        ];
      },
    },
  };
});

describe("App", () => {
  it("renders events list", async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <MemoryRouter>
            <Events />
          </MemoryRouter>
        </AuthProvider>
      </QueryClientProvider>,
    );
    const matched = await screen.findByText(/Test Event/);
    expect(matched).toBeInTheDocument();

    const grid = await screen.findByRole("grid");
    expect(grid).toMatchSnapshot();
  });
});
