import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./common";
import { CssBaseline } from "@mui/material";
import { App } from "./App";
import { ErrorBoundary } from "react-error-boundary";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { StrictMode } from "react";
import { ErrorFallback } from "./common/error";
import { AuthProvider } from "./common/authProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true,
    },
    mutations: {
      throwOnError: true,
    },
  },
});

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <GoogleOAuthProvider
    clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID ?? ""}
  >
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StrictMode>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <App />
              </LocalizationProvider>
            </AuthProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ErrorBoundary>
      </StrictMode>
    </ThemeProvider>
  </GoogleOAuthProvider>,
);
