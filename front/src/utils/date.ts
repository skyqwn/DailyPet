function getDateDetails(dateString: Date | string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return {year, month, day};
}

function getDateWithSeperator(
  dateString: Date | string,
  separator: string = '',
) {
  const {year, day, month} = getDateDetails(dateString);

  return [
    String(year),
    String(month).padStart(2, '0'),
    String(day).padStart(2, '0'),
  ].join(separator);
}

function getDateLocaleFormat(dateString: Date | string) {
  const {year, day, month} = getDateDetails(dateString);

  return `${year}년 ${month}월 ${day}일`;
}

export {getDateWithSeperator, getDateLocaleFormat};
