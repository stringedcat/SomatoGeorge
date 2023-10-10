export const calculateEndomorphy = (
  pliegue_trici,
  pliegue_subesc,
  pliegue_suprai,
  talla
) => {
  let Z = pliegue_trici + pliegue_subesc + pliegue_suprai;
  let PC = (Z * 170.18) / talla;
  return (Endomorphy =
    -0.7182 +
    0.1451 * PC +
    -0.00068 * Math.pow(PC, 2) +
    0.0000014 * Math.pow(PC, 3));
};

export const calculateMesomorphy = (
  per_brazo,
  pliegue_trici,
  per_pierna,
  pliegue_pier,
  DBH,
  DBF,
  talla
) => {
  let B = per_brazo - pliegue_trici / 10;
  let P = per_pierna - pliegue_pier / 10;
  return (Mesomorphy =
    0.858 * DBH + 0.601 * DBF + 0.188 * B + 0.161 * P - talla * 0.131 + 4.5);
};

export const calculateEctomorfia = (talla, peso) => {
  let IP = talla / Math.pow(peso, 1 / 3);

  if (IP >= 40.75) {
    return (Ectomorphy = 0.732 * IP - 28.58);
  } else if (IP > 38.25) {
    return (Ectomorphy = 0.463 * IP - 17.63);
  } else if (IP <= 38.25) {
    return (Ectomorphy = 0.1);
  } else {
    return (Ectomorphy = "NA");
  }
};

export const calculateXY = (Endomorphy, Mesomorphy, Ectomorphy) => {
  let x = Ectomorphy - Endomorphy;
  let y = Mesomorphy * 2 - (Endomorphy + Ectomorphy);
  return [x, y];
};
