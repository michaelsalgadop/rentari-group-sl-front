import React from "react";
import { FaChevronUp } from "react-icons/fa";

export const BtnScrollIntoView = React.memo((props) => {
  const { showArrowToElementToView, title, goToView } = props;

  return (
    <button
      aria-label={title}
      title={title}
      className={`btn-scroll-into-view btn ${showArrowToElementToView ? "" : "invisible"}`}
      onClick={goToView}
    >
      <FaChevronUp></FaChevronUp>
    </button>
  );
});
