/**
 * Use to round a `num` to `dec` th decimal.
 * @param num
 * @param to
 */
export function roundTo(num: number, dec: number = 10) {
  return Math.round(num * dec) / dec;
}

/**
 * Use to get a random number from `min` to `max`.
 * @param min
 * @param max
 * @returns
 */
export function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1));
}
