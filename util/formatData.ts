export function formatDate(date: string | undefined) {
  if (typeof date == 'undefined') {
    return '';
  }
  const d = new Date(date);
  const datestring = `${
    d.getMonth() + 1
  }/${d.getDate()}/${d.getFullYear()} ${d.getHours()}:${(
    '0' + d.getMinutes()
  ).slice(-2)}`;
  return datestring;
}
