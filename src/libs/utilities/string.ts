export const classNames = (classNamesArray: (string | undefined)[]) =>
  classNamesArray.filter(Boolean).join(' ');
