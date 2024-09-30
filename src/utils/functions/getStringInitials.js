/**
 * Returns the uppercase initials of a given string.
 *
 * @param {string} string - The input string to extract initials from.
 * @return {string} The uppercase initials of the input string, or an empty string if the input is empty.
 */
export function getStringInitials(string) {
  if (!string) return "";

  const stringInitial = string.charAt(0).toUpperCase();

  return stringInitial;
}
