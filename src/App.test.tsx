import { render, screen } from "@testing-library/react";
import { App } from "./App";
import { AuthProvider } from "./common";

test("renders Bike Week Admin text", async () => {
  render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );
  const matched = await screen.findByText(/Bike Week Administration/);
  expect(matched).toBeInTheDocument();
});
