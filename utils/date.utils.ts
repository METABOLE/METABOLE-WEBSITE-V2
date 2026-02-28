export const formatDate = (dateStr: string, isFrench: boolean): string => {
  return new Date(dateStr).toLocaleDateString(isFrench ? 'fr-FR' : 'en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateShort = (dateStr: string, isFrench: boolean): string => {
  return new Date(dateStr).toLocaleDateString(isFrench ? 'fr-FR' : 'en-GB', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
};
