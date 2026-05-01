// Import helpers / utils
import { updateObject } from "../object";

/**
 * Delete an item in array at index.
 *
 * @param arr
 * @param index
 *
 * @returns
 */
export function deleteAt<T extends any>(
  arr: Array<T>,
  index: ((item: T) => boolean) | number,
) {
  let idx = -1;

  if (typeof index === "number") {
    idx = index;
  } else {
    idx = arr.findIndex((item) => index(item));
  }

  if (idx === -1) return arr;

  arr.splice(idx, 1);

  return arr;
}

/**
 * Insert a new `item` at `index`.
 *
 * @param arr
 * @param index
 * @param item
 *
 * @returns
 */
export function insertAt<T extends any>(
  arr: Array<T>,
  index: ((item: T) => boolean) | number,
  item: T,
) {
  let idx = -1;

  if (typeof index === "number") {
    idx = index;
  } else {
    idx = arr.findIndex((item) => index(item));
  }

  if (idx === -1) return arr;

  arr.splice(idx, 0, item);

  return arr;
}

/**
 * Replace a new `item` at `index`.
 *
 * @param arr
 * @param index
 * @param item
 *
 * @returns
 */
export function replaceAt<T extends any>(
  arr: Array<T>,
  index: ((item: T) => boolean) | number,
  item: T,
) {
  let idx = -1;

  if (typeof index === "number") {
    idx = index;
  } else {
    idx = arr.findIndex((item) => index(item));
  }

  if (idx === -1) return arr;

  arr.splice(idx, 1, item);

  return arr;
}

/**
 * Update new item in a list.
 *
 * @param arr
 * @param index
 * @param item
 *
 * @returns
 */
export function updateAt<T extends any>(
  arr: Array<T>,
  index: ((item: T) => boolean) | number,
  item: any,
) {
  let idx = -1;

  if (typeof index === "number") {
    idx = index;
  } else {
    idx = arr.findIndex((item) => index(item));
  }

  if (idx === -1) return arr;

  if (
    typeof item === "object" &&
    typeof arr[idx] === "object" &&
    (item !== null || item !== undefined)
  ) {
    item = updateObject(arr[idx], item, { canOverrideValues: true });
  }

  arr.splice(idx, 1, item);

  return arr;
}
