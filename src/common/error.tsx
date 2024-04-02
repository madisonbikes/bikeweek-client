import { Button } from "@mui/material";
import { FallbackProps, useErrorBoundary } from "react-error-boundary";

export const ErrorFallback = ({ error }: FallbackProps) => {
  const { resetBoundary } = useErrorBoundary();

  if (error instanceof Error) {
    return (
      <div role="alert">
        <p>Something went wrong: {error.message}</p>
        <pre>{error.stack}</pre>
        <Button onClick={resetBoundary}>Try again</Button>
      </div>
    );
  } else {
    return (
      <div role="alert">
        <p>Something went wrong: {error}</p>
        <Button onClick={resetBoundary}>Try again</Button>
      </div>
    );
  }
};
