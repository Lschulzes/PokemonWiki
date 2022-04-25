export const RevertSlug = (word: string) =>
  word
    .split("-")
    .map((el) => el.charAt(0).toUpperCase() + el.slice(1))
    .join(" ");
