import { Button } from "@mui/material";
import { FallbackProps } from "react-error-boundary";

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div role="alert">
      <p>Something went wrong: {error.message}</p>
      <pre>{error.stack}</pre>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </div>
  );
};
