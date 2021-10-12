export const counter = (function () {
  const counters = {};
  let result;

  return function (value, name) {
    switch (typeof value) {
      case "undefined":
        if (!counters.hasOwnProperty("default")) {
          counters.default = 0;
        } else {
          counters.default++;
        }
        result = counters.default;
        break;

      case "number":
        if (name === undefined) {
          counters.default = value;
          result = counters.default;
        }

        if (typeof name === "string") {
          counters[name] = value;
          result = counters[name];
        }
        break;

      case "string":
        delete counters.default;
        if (!counters.hasOwnProperty(value)) {
          counters[value] = 0;
        } else {
          counters[value]++;
        }
        result = counters[value];
    }
    return result;
  };
})();

export function callableMultiplier() {
  // TODO:
  throw "Not implemented";
}

export function createCalculator() {
  // TODO:
  throw "Not implemented";
}
