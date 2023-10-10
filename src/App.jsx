import { useState, useEffect } from "react";
import "./App.scss";
import Chart from "./Chart";

import { index } from "d3";
import PersonalData from "./components/PersonalData";
import FormWithFile from "./components/FormWithFile";
function App() {
  const [chartState, setChartState] = useState(false);
  const [variablesXY, setVariablesXY] = useState([]);

  var data = [
    { x: variablesXY[0], y: variablesXY[1] }, // cuadrante Superior Medio Derecho
    // {"x":52,"y":-13},   // cuadrante Inferior Medio Derecho
    // {"x":25,"y":-33},   // cuadrante Inferior Bajo Derecho
    // {"x":-25,"y":-33},  // cuadrante Inferior Bajo Izquierdo
    // {"x":-42,"y":-14},  // cuadrante Inferior Medio Izquierdo
  ];

  return (
    <main className="App">
      <section>
        {" "}
        <div className="logo-box">
          <a
            href="https://github.com/electron-vite/electron-vite-react"
            target="_blank"
          >
            <img
              src="./vite.svg"
              className="logo vite"
              alt="Electron + Vite logo"
            />
            <img
              src="./electron.svg"
              className="logo electron"
              alt="Electron + Vite logo"
            />
          </a>
        </div>
        <h1>SomatoGeorge v2.1</h1>
        <h2>Carga de datos</h2>
      </section>
      <section>
        <PersonalData />
        <FormWithFile
          setChartState={setChartState}
          setVariablesXY={setVariablesXY}
          data={data}
        />
      </section>

      {chartState && <Chart data={data} />}
      
    </main>
  );
}

export default App;
