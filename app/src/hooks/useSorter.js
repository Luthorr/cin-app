export const useSorter = () => {
  const sortData = (dataArray, prop, asc) => {
    const arrayCopy = [...dataArray];
    if (asc) {
      arrayCopy.sort((a, b) => a[prop].localeCompare(b[prop]));
    } else {
      arrayCopy.sort((a, b) => b[prop].localeCompare(a[prop]));
    }
    return arrayCopy;
  };

  const sortNestedData = (dataArray, prop, nestedProp, asc) => {
    const arrayCopy = [...dataArray];
    if (asc) {
      arrayCopy.sort((a, b) =>
        a[prop][nestedProp]
          .toString()
          .localeCompare(b[prop][nestedProp].toString())
      );
    } else {
      arrayCopy.sort((a, b) =>
        b[prop][nestedProp].toString().localeCompare(a[prop][nestedProp])
      );
    }
    return arrayCopy;
  };

  return { sortData, sortNestedData };
};
