import React from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { schemaBtnBack } from "../../schemas/vehiclesSchemas";

export const BtnBack = React.memo((props) => {
  const { urlTo } = props;
  const navigate = useNavigate();
  const back = (e) => {
    e.preventDefault();
    navigate(urlTo);
  };
  return (
    <div className="row">
      <div className="col-12">
        <button className="btn-back btn" onClick={back}>
          <FaChevronLeft></FaChevronLeft>
        </button>
      </div>
    </div>
  );
});
BtnBack.propTypes = schemaBtnBack;
