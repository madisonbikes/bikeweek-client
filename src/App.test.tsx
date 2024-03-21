import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App } from "./App";
import { vi } from "vitest";

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

const queryClient = new QueryClient();
describe("App", () => {
  it("renders Bike Week Admin text", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>,
    );
    const matched = await screen.findByText(/Bike Week Administration/);
    expect(matched).toBeInTheDocument();
  });
});
