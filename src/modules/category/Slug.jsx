import React from "react";
import { statusCategory } from "../../utils/Const";
import PropTypes from "prop-types";

const Slug = ({ status }) => {
  let style = "";
  switch (status) {
    case statusCategory.Unapproved:
      style = "bg-red-50 text-red-400";
      break;
    case statusCategory.Approved:
      style = "bg-green-100 text-green-400";
      break;
    default:
      break;
  }
  return (
    <div className={`p-2 inline-block rounded-lg text-center ${style}`}>
      {status === statusCategory.Approved ? "Approved" : "Unapproved"}
    </div>
  );
};
Slug.propTypes = {
  status: PropTypes.oneOf([statusCategory.Unapproved, statusCategory.Approved])
    .isRequired,
};
export default Slug;
