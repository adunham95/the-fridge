export function formatDate(
  date: string | undefined,
  showDate = true,
  showTime = true,
) {
  if (typeof date == 'undefined') {
    return '';
  }
  const d = new Date(date);
  const dateString = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  const timeString = ` ${d.getHours()}:${('0' + d.getMinutes()).slice(-2)}`;

  return `${showDate ? dateString : ''}${showDate && showTime ? ' ' : ''}${
    showTime ? timeString : ''
  }`;
}
