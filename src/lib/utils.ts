export function createSlug(text: string) {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with a hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading or trailing hyphens
}
