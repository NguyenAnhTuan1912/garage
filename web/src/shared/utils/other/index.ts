// Import utils
import { getCurrentTime } from "../datetime";

type TCase = {
  case: boolean;
  returnValue: any;
};

/**
 * This function allow performing a switch-case statement, but more flexible.
 * @param cases
 * @returns
 */
export function fromCase(cases: Array<TCase>) {
  for (const c of cases) {
    if (c.case) {
      return typeof c.returnValue === "function"
        ? c.returnValue()
        : c.returnValue;
    }
  }
}

/**
 * Use to toggle boolean state of a object.
 *
 * This function should be used in a case that you want to operate when
 * its state is `true` or `false`.
 * @param o
 * @param propName
 * @param fn
 * @returns
 */
export function togglePropertyState<T>(
  o: T,
  propName: keyof T,
  fn?: (status: boolean) => void,
) {
  if (typeof o[propName] !== "boolean") return;

  // Toggle state
  (o[propName] as boolean) = !o[propName];

  // Call
  if (fn) fn(o[propName] as boolean);
}

/**
 * Use this function to perform "delay" in asynchronous task.
 * @param time
 * @returns
 */
export function wait(time = 0) {
  return new Promise(function (res) {
    setTimeout(res, time, true);
  });
}

/**
 * Print `message` to console with time or not
 * @param message
 * @param withTime
 */
export function debug(message: string, withTime?: boolean) {
  if (withTime) {
    console.log("At time:", getCurrentTime(undefined, { hasMilisecond: true }));
  }
  console.log(message);
}

/**
 * Tạo ra một hàm mởi và chỉ cho phép hàm mới đó được gọi sau một khoảng
 * thời gian `wait`, nên không gọi hàm này liên tục được.
 * @param func
 * @param wait
 * @returns
 */
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;

  return function (...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Tạo ra một hàm mới và chỉ cho phép hàm mới đó chỉ được gọi sau một thời
 * gian `delay` nhất định.
 * @param func
 * @param limit
 * @returns
 */
export function throttle<T extends (...args: any[]) => void>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timerFlag: ReturnType<typeof setTimeout> | null = null;

  return function (...args: Parameters<T>) {
    if (timerFlag === null) {
      func(...args);
      timerFlag = setTimeout(() => {
        timerFlag = null;
      }, delay);
    }
  };
}
