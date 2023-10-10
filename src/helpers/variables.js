export const datosAntropometricos = [
  { id: 0, value: "Peso (kg)" },
  { id: 1, value: "Talla (cm)" },
  { id: 2, value: "Perímetro brazo (cm)" },
  { id: 3, value: "Perímetro de pierna (cm)" },
  { id: 4, value: "Diámetro humeral (cm)" },
  { id: 5, value: "Diámetro femoral (cm)" },
  { id: 6, value: "Pliegue tricipital (mm)" },
  { id: 7, value: "Pliegue subescapular (mm)" },
  { id: 8, value: "Pliegue suprailíaco (mm)" },
  { id: 9, value: "Pliegue de pierna (mm)" },
];
export function isXLSXorCSVFile(file) {
  // Check if the file name ends with ".xlsx" or ".csv" (case-insensitive)
  const isXLSXorCSV = /\.(xlsx|csv)$/i.test(file.name);

  return !isXLSXorCSV;
}


