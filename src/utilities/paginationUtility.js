export function pageNumbers(page_size, item_count) {
  const number_of_pages = Math.ceil(item_count / page_size);
  let page_number_array = [];
  for (let i = 1; i <= number_of_pages; i++) {
    page_number_array[i-1] = i;
  }
  return page_number_array;
}
