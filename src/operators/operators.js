export function add(a, b) {
  if (!Number.isInteger(a) || !Number.isInteger(b)) return null;
  return a + b;
}

export function subtract(a, b) {
  if (!Number.isInteger(a) || !Number.isInteger(b)) return null;
  return a - b;
}

export function complex([x1, x2], [y1, y2]) {
  if (
    !Number.isInteger(x1) ||
    !Number.isInteger(x2) ||
    !Number.isInteger(y1) ||
    !Number.isInteger(y2)
  )
    return null;

  const x = x1 * x2;
  const y = y1 / y2;
  return x ** y;
}
