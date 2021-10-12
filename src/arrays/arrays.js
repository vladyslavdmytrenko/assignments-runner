export function mapTo() {
  // TODO:
  throw "Not implemented";
}

export function mapToProfile() {
  // TODO:
  throw "Not implemented";
}

export function filterBy(array, filterParam) {
  switch (typeof filterParam) {
    case "number":
      return array.filter((el) => el >= filterParam);

    case "string":
      return array.filter((el) => el.hasOwnProperty(filterParam));

    case "object":
      return array.filter((el) => {
        if (!el.hasOwnProperty(filterParam.property)) return false;
        return filterParam.filterCb(el[filterParam.property]);
      });
  }
}

export function reduceTo(array, reduceParam) {
  switch (typeof reduceParam) {
    case "undefined":
      return array.reduce((prevVal, currVal) => (prevVal += currVal));

    case "string":
      return array.reduce(
        (prevVal, currVal) => (prevVal += currVal[reduceParam])
      );

    case "object":
      return array.reduce((prevVal, currVal) => {}, []);
  }
}

export function sort() {
  // TODO:
  throw "Not implemented";
}

export function complex() {
  // TODO:
  throw "Not implemented";
}
