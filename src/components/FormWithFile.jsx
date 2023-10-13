import React from "react";
import { useState } from "react";
import { datosAntropometricos } from "../helpers/variables";

import { numberDropdown } from "../helpers/handleSelectedFunction";
import readXlsxFile from "read-excel-file";
import { index } from "d3";

function FormWithFile({ setChartState, setVariablesXY, data }) {
  const initialState = [];
  const [datosTemporales, setDatosTemporales] = useState({});
  const [renderDatos, setRenderDatos] = useState(false);
  const [somato, setSomato] = useState([]);
  const [file, setFile] = useState(initialState);
  let map = new Map();
  let dataForCalculations = [];
  let arrayFinalForCalculations = [];

  const handleSelected = (e) => {
    const saveSelected = numberDropdown[e.target.id];

    const mapTemporal = saveSelected(e, map, file);

    map = mapTemporal;
    dataForCalculations = [...map];
  };

  const calculateEndomorphy = (Var14, Var16, Var17, Var3) => {
    let Endomorphy = 0;
    let Z = Var14 + Var16 + Var17;
    let PC = (Z * 170.18) / Var3;
    Endomorphy =
      -0.7182 +
      0.1451 * PC +
      -0.00068 * Math.pow(PC, 2) +
      0.0000014 * Math.pow(PC, 3);
    setSomato(somato.push(Endomorphy));
  };

  const calculateMesomorphy = (
    Var5,
    Var14,
    Var8,
    Var19,
    Var12,
    Var13,
    Var3
  ) => {
    let Mesomorphy = 0;
    let B = Var5 - Var14 / 10;
    let P = Var8 - Var19 / 10;
    Mesomorphy =
      0.858 * Var12 +
      0.601 * Var13 +
      0.188 * B +
      0.161 * P -
      Var3 * 0.131 +
      4.5;

    setSomato(somato.push(Mesomorphy));
  };

  const calculateEctomorfia = (Var3, Var1) => {
    let IP = Var3 / Math.pow(Var1, 1 / 3);
    let Ectomorphy = 0;

    if (IP >= 40.75) {
      Ectomorphy = 0.732 * IP - 28.58;
    } else if (IP > 38.25) {
      Ectomorphy = 0.463 * IP - 17.63;
    } else if (IP <= 38.25) {
      Ectomorphy = 0.1;
    } else {
      Ectomorphy = "NA";
    }

    setSomato(somato.push(Ectomorphy));
  };

  const calculateXY = (somato) => {
    let x = somato[2] - somato[0];
    let y = somato[1] * 2 - (somato[0] + somato[2]);

    let array = [];

    array.push(x);
    array.push(y);

    setVariablesXY(array);
  };

  const handleSubmit = (e) => {
    if (dataForCalculations.length >= 1) {
      let arrayWithoutKeys = [];

      let results2 = [];
      let arr1d = [];
      e.preventDefault();
      for (let key in dataForCalculations) {
        arrayWithoutKeys.push(dataForCalculations[key][1]);
      }

      console.log("=====> arrayWithoutKeys", arrayWithoutKeys);
      for (var i = 0; i < arrayWithoutKeys.length; i++) {
        let results1 = [];
        for (var j = i + 1; j < arrayWithoutKeys.length; j++) {
          results1.push(arrayWithoutKeys[i].slice(i, j));
          arr1d = [].concat(...results1);
        }
        results2.push(arr1d);
      }

      console.log("results2", results2);
      // aca tengo que ver una manera de agarrar una columna de
      // los arrayForCalculations y mandarlo a las funciones para
      // el problema es juntar todos lo datos en un mismo array
    } else {
      e.preventDefault();
      calculateEndomorphy(
        datosTemporales["Var14"],
        datosTemporales["Var16"],
        datosTemporales["Var17"],
        datosTemporales["Var3"]
      );

      calculateMesomorphy(
        datosTemporales["Var5"],
        datosTemporales["Var14"],
        datosTemporales["Var8"],
        datosTemporales["Var19"],
        datosTemporales["Var12"],
        datosTemporales["Var13"],
        datosTemporales["Var3"]
      );

      calculateEctomorfia(datosTemporales["Var3"], datosTemporales["Var1"]);

      calculateXY(somato);

      console.log(somato, "valores somatotipo");

      setSomato([]);
      console.log("chart state true");
      setChartState(true);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      readXlsxFile(e.target.files[0]).then((rows) => {
        // `rows` is an array of rows
        // each row being an array of cells.
        setFile(rows);

        setRenderDatos(true);
      });
    }
  };

  return (
    <div>
      {" "}
      <form onSubmit={handleSubmit}>
        <h3>Datos antropométricos</h3>
        <input type="file" onChange={handleFileChange} /> <br />
        {renderDatos ? (
          <>
            {datosAntropometricos.map((colummnas) => (
              <>
                <label htmlFor="">{colummnas.value}</label>
                <select id={colummnas.id} onChange={(e) => handleSelected(e)}>
                  {file[0].map((columnaDropdown, i) => (
                    <option id={i} key={i} value={columnaDropdown}>
                      {columnaDropdown}
                    </option>
                  ))}
                </select>{" "}
                <br />
              </>
            ))}
            <button type="submit">Calcular</button>
          </>
        ) : (
          <>
            <label htmlFor="">Peso (kg) </label>
            <input
              type="number"
              name="Var1"
              onChange={(e) =>
                setDatosTemporales({
                  ...datosTemporales,
                  Var1: parseFloat(e.target.value),
                })
              }
            />
            <br />
            <label htmlFor="">Talla (cm) </label>
            <input
              type="number"
              name="Var3"
              onChange={(e) =>
                setDatosTemporales({
                  ...datosTemporales,
                  Var3: parseFloat(e.target.value),
                })
              }
            />
            <br />
            <label htmlFor="">Perímetro brazo (cm) </label>
            <input
              type="number"
              name="Var5"
              onChange={(e) =>
                setDatosTemporales({
                  ...datosTemporales,
                  Var5: parseFloat(e.target.value),
                })
              }
            />
            <br />
            <label htmlFor="">Perímetro de pierna (cm)</label>
            <input
              type="number"
              name="Var8"
              onChange={(e) =>
                setDatosTemporales({
                  ...datosTemporales,
                  Var8: parseFloat(e.target.value),
                })
              }
            />
            <br />
            <label htmlFor="">Diámetro humeral (cm) </label>
            <input
              type="number"
              name="Var12"
              onChange={(e) =>
                setDatosTemporales({
                  ...datosTemporales,
                  Var12: parseFloat(e.target.value),
                })
              }
            />
            <br />
            <label htmlFor="">Diámetro femoral (cm) </label>
            <input
              type="number"
              name="Var13"
              onChange={(e) =>
                setDatosTemporales({
                  ...datosTemporales,
                  Var13: parseFloat(e.target.value),
                })
              }
            />
            <br />
            <label htmlFor="">Pliegue tricipital (mm) </label>
            <input
              type="number"
              name="Var14"
              onChange={(e) =>
                setDatosTemporales({
                  ...datosTemporales,
                  Var14: parseFloat(e.target.value),
                })
              }
            />
            <br />
            <label htmlFor="">Pliegue subescapular (mm)</label>
            <input
              type="number"
              name="Var16"
              onChange={(e) =>
                setDatosTemporales({
                  ...datosTemporales,
                  Var16: parseFloat(e.target.value),
                })
              }
            />
            <br />
            <label htmlFor="">Pliegue suprailíaco (mm)</label>
            <input
              type="number"
              name="Var17"
              onChange={(e) =>
                setDatosTemporales({
                  ...datosTemporales,
                  Var17: parseFloat(e.target.value),
                })
              }
            />
            <br />
            <label htmlFor="">Pliegue de pierna (mm) </label>
            <input
              type="number"
              name="Var19"
              onChange={(e) =>
                setDatosTemporales({
                  ...datosTemporales,
                  Var19: parseFloat(e.target.value),
                })
              }
            />
            <br />
            <br />
            <button type="submit">Calcular</button>{" "}
          </>
        )}
      </form>
    </div>
  );
}

export default FormWithFile;
