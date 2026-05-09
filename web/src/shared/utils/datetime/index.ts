// Import types
import type { TGetCurrentTimesOptions } from "./types";

/**
 * Get local datetime with format `hh:mm:ss::ms` or `hh-mm-ss::ms`.
 * Set `separator` to get your own separator
 */
export function getCurrentTime(
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
