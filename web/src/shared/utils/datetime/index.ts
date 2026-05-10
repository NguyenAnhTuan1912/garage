// Import types
import type { TGetCurrentTimesOptions } from "./types";

/**
 * Get local datetime with format `hh:mm:ss::ms` or `hh-mm-ss::ms`.
 * Set `separator` to get your own separator
 */
export function getCurrentTimeStr(
  datetime?: any,
  options?: TGetCurrentTimesOptions
) {
  const now = datetime ? new Date(datetime) : new Date();
  const separator = options && options.separator ? options.separator : ":";

  let hh = now.getHours().toString().padStart(2, "0"),
    mm = now.getMinutes().toString().padStart(2, "0"),
    ss = now.getSeconds().toString().padStart(2, "0");

  if (options && options.hasMilisecond) {
    return `${hh}${separator}${mm}${separator}${ss}::${now.getMilliseconds()}`;
  }

  return `${hh}${separator}${mm}${separator}${ss}`;
}

export function getTimeStr(datetimeStr: string) {
  const dt = new Date(datetimeStr);

  const hourStr = `${dt.getHours()}`.padStart(2, "0");
  const minStr = `${dt.getMinutes()}`.padStart(2, "0");
  const secondStr = `${dt.getSeconds()}`.padStart(2, "0");

  return `${hourStr}:${minStr}:${secondStr}`;
};

export function getDateTimeStr(datetimeStr: string) {
  const dt = new Date(datetimeStr);

  const dateStr = `${dt.getDate()}`.padStart(2, "0");
  const monthStr = `${dt.getMonth()}`.padStart(2, "0");
  const yearStr = `${dt.getFullYear()}`.padStart(2, "0");

  return `${dateStr}/${monthStr}/${yearStr}`;
}

export function getDateDistance(targetDate: Date, dateNow: Date = new Date()) {
  const miliSecDistance = Math.abs(targetDate.getTime() - dateNow.getTime());
  return Math.round(miliSecDistance / 1000 / 60 / 60 / 24);
}