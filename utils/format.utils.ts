export const stripInvisibleChars = (str: string): string => {
  if (typeof str !== 'string') return '';
  return str.replace(/[\u200B-\u200D\u2060\uFEFF\u180E\u00AD]/g, '').trim();
};
