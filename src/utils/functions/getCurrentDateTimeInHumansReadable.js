/**
 * Returns the current date and time in a human-readable format.
 *
 * @return {string} The current date and time in the format 'DD/MM/YYYY, HH:mm:ss'.
 */
export function getCurrentDateTimeInHumansReadable() {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  const hours = currentDate.getHours();
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

  const ampm = hours >= 12 ? "PM" : "AM";

  return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds} ${ampm}`;
}
