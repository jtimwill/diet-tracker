export function reformatDate(date_string){
  const year = date_string.slice(0,4);
  const month = date_string.slice(5,7);
  const day = date_string.slice(8,10);
  return `${month}-${day}-${year}`;
}
