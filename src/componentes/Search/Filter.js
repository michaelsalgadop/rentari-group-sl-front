export const Filter = (props) => {
  return (
    <div className="contenedor-buscador">
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="form-group">
          <label htmlFor="marca">Marca:</label>
          <select className="form-control">
            <option value="opel">Opel</option>
            <option value="bmw">BMW</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="marca">Modelo:</label>
          <select className="form-control">
            <option value="-1">-</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="contrasenya">Precio:</label>
          <select className="form-control">
            <option value="-1">Hasta</option>
            <option value="200">200 €</option>
            <option value="400">400 €</option>
            <option value="600">600 €</option>
            <option value="800">800 €</option>
            <option value="1000">1000 €</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="contrasenya">Kilometros:</label>
          <select className="form-control">
            <option value="0">0</option>
            <option value="30000">30000</option>
            <option value="50000">50000</option>
            <option value="80000">80000</option>
            <option value="100000">100000</option>
            <option value="100000">140000</option>
            <option value="160000">160000</option>
            <option value="180000">180000</option>
            <option value="200000">200000</option>
          </select>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary form-control">
            Buscar
          </button>
        </div>
      </form>
    </div>
  );
};
