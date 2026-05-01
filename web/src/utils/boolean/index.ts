/**
 * Use to check if a variable (as data) has value
 * @param data
 * @returns
 */
export function isTruthy<T>(data?: T | null): data is T {
  return !isFalsy(data);
}

/**
 * Use to check if a variable (as data) hasn't value
 * @param data
 * @returns
 */
export function isFalsy<T>(data?: T | null): data is null | undefined {
  if (typeof data === "number" && data !== 0) return false;
  if (typeof data === "string" && data !== "") return false;
  return !data;
}

/**
 * Use to check if a variable (as data) is empty
 * @param data
 * @returns
 */
export function isEmpty<T>(data?: T): data is undefined {
  switch (typeof data) {
    case "string": {
      return !data;
    }

    case "number": {
      return data === undefined || data === null || Number.isNaN(data);
    }

    case "object": {
      if (Array.isArray(data)) return data.length === 0;
      return Object.getOwnPropertyNames(data).length === 0;
    }

    case "undefined": {
      return true;
    }

    default:
      return data === undefined || data === null || false;
  }
}
