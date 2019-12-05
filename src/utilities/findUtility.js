export function findCategory(category_id, categories) {
  const category = categories.find((category) => {
    return category.id === category_id;
  });
  return category ? category.name : "";
}
