/**
 * Returns the current date and time in ISO 8601 format.
 *
 * @return {string} The current date and time in the format 'YYYY-MM-DDTHH:mm:ssZ'.
 */
export function getCurrentDateTime() {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(3, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}
