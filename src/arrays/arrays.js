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
    const age = el.age || null;
    const name = el.name || null;
    const surname = el.surname || null;
    const fullname =
      name || surname
        ? `${name || "_"} ${surname || "_"}`
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
          return this.age ? this.age >= 65 : false;
        },
      },
      isAnonymous: {
        get: function () {
          return !this.fullname;
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

function sortByOrder(a, b, order = "asc") {
  let result;

  // switch (order) {
  //   case "desc":
  //     if (a > b) return -1;
  //     if (a < b) return 1;

  //   case "asc":
  //     if (a < b) return -1;
  //     if (a > b) return 1;
  // }

  switch (order) {
    case "desc":
      if (a > b) result = -1;
      if (a < b) result = 1;
      return result;

    case "asc":
      if (a < b) result = -1;
      if (a > b) result = 1;
      return result;
  }
}

export function sort(array, sortParam) {
  switch (typeof sortParam) {
    case "undefined":
      return array.sort((a, b) => a - b);

    case "string":
      return array.sort((a, b) => a[sortParam] - b[sortParam]);

    case "object":
      return array.sort((a, b) => {
        let result;

        sortParam.forEach((el, index, array) => {
          if (!result) {
            if (typeof el === "string") {
              result = sortByOrder(a[el], b[el]);
              return;
            }

            result = sortByOrder(a[el.field], b[el.field], el.order);
          }

          if (!result && index === array.length - 1) result = 0;
        });

        return result;
      });
  }
}

export function complex(array, complexParams) {
  let result;

  complexParams.forEach((param) => {
    switch (param.operation) {
      case "filter":
        result = array.filter((el) => param.callback(el[param.property]));
        break;

      case "map":
        result = result.map((el) => el[param.property]);
        break;

      case "reduce":
        result = result.reduce((prevVal, currEl) => {
          prevVal += currEl[param.property];
          return prevVal;
        }, 0);
        break;

      case "sort":
        result = result.sort((a, b) => sortByOrder(a, b, param.order));
        break;
    }
  });

  return result;
}
