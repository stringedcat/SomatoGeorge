import React from "react";

function PersonalData() {
  return (
    <div>
      {" "}
      <h3>Datos personales</h3>
      <label htmlFor="">Apellidos</label>
      <input type="text" /> Anónimo
      <input type="checkbox" name="" id="" />
      <br />
      <label htmlFor="">Nombres</label>
      <input type="text" />
      <br />
      <label htmlFor="">Sexo</label>
      <select name="" id="">
        <option value="">Femenino</option> <option value="">Masculino</option>
      </select>
    </div>
  );
}

export default PersonalData;
