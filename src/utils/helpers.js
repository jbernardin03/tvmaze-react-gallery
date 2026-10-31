export function stripHtml(html) {
  if (!html) return "Not available";
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "Not available";
}

export function formatDate(dateString) {
  if (!dateString) return "Not available";
  return new Date(dateString).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDateTime(dateTimeString) {
  if (!dateTimeString) return "Not available";
  return new Date(dateTimeString).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function fallback(value, defaultText = "Not available") {
  if (value === null || value === undefined || value === "") {
    return defaultText;
  }
  return value;
}