const setDataMap = (file, temporalIndex, map, numberForMap) => {
  let temporalArray = [];
  for (let i = 1; i < file.length; i++) {
    let temporalArrayFor = file[i];

    temporalArray.push(temporalArrayFor[temporalIndex]);
  }

  

  map.set(numberForMap, temporalArray);

  console.log(map);

  return map;
};

export const numberDropdown = {
  0: (e, map, file) => {
    let temporalIndex = file[0].indexOf(e.target.value);

    return setDataMap(file, temporalIndex, map, 0) ;
  },
  1: (e, map, file) => {
    let temporalIndex = file[0].indexOf(e.target.value);

    return setDataMap(file, temporalIndex, map, 1);
  },
  2: (e, map, file) => {
    let temporalIndex = file[0].indexOf(e.target.value);

    return setDataMap(file, temporalIndex, map, 2);
  },
  3: (e, map, file) => {
    let temporalIndex = file[0].indexOf(e.target.value);

    return setDataMap(file, temporalIndex, map, 3);
  },
  4: (e, map, file) => {
    let temporalIndex = file[0].indexOf(e.target.value);

    return setDataMap(file, temporalIndex, map, 4);
  },
  5: (e, map, file) => {
    let temporalIndex = file[0].indexOf(e.target.value);

    return setDataMap(file, temporalIndex, map, 5);
  },
  6: (e, map, file) => {
    let temporalIndex = file[0].indexOf(e.target.value);

    return setDataMap(file, temporalIndex, map, 6);
  },
  7: (e, map, file) => {
    let temporalIndex = file[0].indexOf(e.target.value);

    return setDataMap(file, temporalIndex, map, 7);
  },
  8: (e, map, file) => {
    let temporalIndex = file[0].indexOf(e.target.value);

    return setDataMap(file, temporalIndex, map, 8);
  },
  9: (e, map, file) => {
    let temporalIndex = file[0].indexOf(e.target.value);

    return setDataMap(file, temporalIndex, map, 9);
  },
};
