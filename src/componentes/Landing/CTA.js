import { useNavigate } from "react-router-dom";
export const CTA = (props) => {
  const { titulo, textoBtn } = props;
  const navigate = useNavigate();
  return (
    <section className="seccion-cta row pb-5">
      <div className="col-12">
        <div className="row">
          <h2 className="col-12 text-center">{titulo}</h2>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <button
              className="cta btn btn-principal mt-2"
              onClick={() => navigate("/search")}
            >
              {textoBtn}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
