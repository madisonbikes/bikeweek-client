import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@mui/material/styles";
import { theme, AuthProvider, ErrorFallback } from "./common";
import { CssBaseline } from "@mui/material";
import { App } from "./App";
import { ErrorBoundary } from "react-error-boundary";

// for date pickers
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { GoogleOAuthProvider } from "@react-oauth/google";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <GoogleOAuthProvider
    clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID ?? ""}
  >
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <React.StrictMode>
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
      </React.StrictMode>
    </ThemeProvider>
  </GoogleOAuthProvider>,
);
