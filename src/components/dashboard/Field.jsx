import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../Error/ErrorFallback";

const Field = ({ children, className = "" }) => {
  return (
    <div className={`w-full my-3 sm:my-0 lg:w-2/4 ${className}`}>
      {children}
    </div>
  );
};

export default withErrorBoundary(Field, {
  FallbackComponent: ErrorFallback,
});
