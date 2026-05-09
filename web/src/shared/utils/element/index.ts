/**
 * Use to check if an element is scrollable or not
 * @param element
 * @returns
 */
export function isScrollable<T extends HTMLElement>(element: T) {
  if (!element) return false;

  const cssStyles = window.getComputedStyle(element);
  const overflowValue = cssStyles.getPropertyValue("overflow");
  const check = element.scrollHeight > element.clientHeight;

  return check && (overflowValue === "scroll" || overflowValue === "auto");
}
