export default function (dateString) {  
  const date = new Date(dateString);
  const year = date.getFullYear();
  let month = (date.getMonth() + 1).toString();
  month = month.length === 1 ? '0' + month : month;
  let day = date.getDate().toString();
  day = day.length === 1 ? '0' + day : day;
  return `${year}-${month}-${day}`;
}