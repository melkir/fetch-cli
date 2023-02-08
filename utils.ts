/**
 * Check if a string is a valid url
 * @param str the string to check
 * @returns boolean
 */
export function isURL(str: string): boolean {
  try {
    new URL(str);
  } catch (_) {
    return false;
  }
  return true;
}
