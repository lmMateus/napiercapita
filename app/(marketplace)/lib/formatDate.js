import { format } from "date-fns";
export default function formatDate(date) {
  if (!date) return ""; // Retorna uma string vazia se a data for nula
  return format(date, "dd/MM/yyyy"); // Formata a data no padrão "DD/MM/YYYY"
}
// import { format, add } from "date-fns";

// export default function formatDate(date) {
//   if (!date) return ""; // Retorna uma string vazia se a data for nula
//   // Adiciona um dia à data para ajustar o fuso horário
//   const adjustedDate = add(date, { days: -1 });
//   // Formata a data no padrão "DD/MM/YYYY"
//   return format(adjustedDate, "dd/MM/yyyy");
// }