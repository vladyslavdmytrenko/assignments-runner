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

export const callableMultiplier = (function () {
  let counter = null;
  let result;
  return function (...arr) {
    if (arr.length > 0) {
      const initValue = counter ? counter : 1;
      counter = arr.reduce((prev, curr) => prev * curr, initValue);
      return callableMultiplier;
    }
    result = counter;
    counter = null;
    return result;
  };
})();

function Calculator(initValue = 0) {
  this.log = [];
  this._value = initValue;

  Object.defineProperty(this, "value", {
    value: initValue,
    get: function () {
      return this.value;
    },
    set: function (value) {
      return value;
    },
  });
}
Calculator.prototype.add = function (value) {
  this.value + value;
};

let a = new Calculator(1);

export function createCalculator(initValue) {
  return new Calculator(initValue);
}
