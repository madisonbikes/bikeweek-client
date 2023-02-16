import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { App } from "./App";

jest.mock("./common", () => ({
  useAuth: () => {
    return {
      state: { authenticated: true },
      setState: () => {
        return undefined;
      },
    };
  },
}));

const queryClient = new QueryClient();

test("renders Bike Week Admin text", async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
  const matched = await screen.findByText(/Bike Week Administration/);
  expect(matched).toBeInTheDocument();
});
