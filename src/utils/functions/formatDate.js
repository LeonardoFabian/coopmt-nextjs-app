import { DateTime } from "luxon";

export function formatDate(dateString) {
  return DateTime.fromISO(dateString)
    .setLocale("es")
    .toLocaleString(DateTime.DATE_MED);
}
