/**
 * Returns the first word in a given string.
 *
 * @param {string} string - The input string.
 * @return {string} The first word in the input string.
 */
export function getFirstWordForString(string) {
  const stringParts = string.trim().split(" ");

  if (stringParts.length > 0) {
    return `${stringParts[0]}`;
  } else {
    return "";
  }

  return stringParts[0];
}
