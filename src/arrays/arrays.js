export function mapTo(array, param) {
  switch (typeof param) {
    case "undefined":
      return array.map((el, index) => index);

    case "string":
      return array.reduce((result, currentValue) => {
        if (currentValue[param]) result.push(currentValue[param]);
        return result;
      }, []);
  }
}

export function mapToProfile(array) {
  return array.map((el) => {
    const age = el.age ? el.age : null;
    const name = el.name ? el.name : null;
    const surname = el.surname ? el.surname : null;
    const fullname =
      name || surname
        ? `${name ? name : "_"} ${surname ? surname : "_"}`
        : null;
    const result = {
      name,
      surname,
      fullname,
      age,
    };

    Object.defineProperties(result, {
      isOld: {
        get: function () {
          return this.age ? (this.age >= 65 ? true : false) : false;
        },
      },
      isAnonymous: {
        get: function () {
          return this.fullname ? false : true;
        },
      },
    });

    return result;
  });
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
        (prevVal, currVal) => (prevVal += currVal[reduceParam]),
        0
      );

    case "object":
      return array.reduce(
        (prevVal, currVal) => {
          prevVal[0] += currVal[reduceParam[0]];
          prevVal[1] += currVal[reduceParam[1]];
          return prevVal;
        },
        [0, 0]
      );
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
