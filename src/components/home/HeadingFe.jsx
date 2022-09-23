import React from "react";
import PropTypes from "prop-types";
import ErrorFallback from "../Error/ErrorFallback";
import { withErrorBoundary } from "react-error-boundary";
const HeadingFe = ({ children }) => {
  return <p className="text-blue-400 text-2xl my-5 font-bold">{children}</p>;
};

HeadingFe.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
};
export default withErrorBoundary(HeadingFe, {
  FallbackComponent: ErrorFallback,
});
