export function compareNames(a, b) {
  let name_a = a.name.toUpperCase();
  let name_b = b.name.toUpperCase();
  if (name_a < name_b) {
    return -1;
  } else if (name_a > name_b) {
    return 1;
  } else {
    return 0;
  }
}

export function compareDates(a, b) {
  return new Date(b.createdAt) - new Date(a.createdAt);
}
