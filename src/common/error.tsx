import { FallbackProps } from "react-error-boundary";

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div role="alert">
      <p>Something went wrong: {error.message}</p>
      <pre>{error.stack}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};
