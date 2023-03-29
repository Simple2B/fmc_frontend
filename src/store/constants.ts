export const INTERVAL_NEWS_LETTER_POP_UP = 10000;

export const RE_POST_CODE = /^[0-9]*$/;
export const RE_CITY =
  /(\b( +)?\d{1,6} +(north|east|south|west|n|e|s|w)[,.]?){2}(.{0,25} +\b\d{5}\b)?\b/gi;

export const RE_STREET =
  /\b\d{1,6} +.{2,25}\b(avenue|ave|court|ct|street|st|drive|dr|lane|ln|road|rd|blvd|plaza|parkway|pkwy)[.,]?(.{0,25} +\b\d{5}\b)?/gi;

export const emptyLocation = {
  city: {
    name: '',
    isError: false,
    messageError: '',
  },
  street: {
    name: '',
    isError: false,
    messageError: '',
  },
  postal_code: {
    name: '',
    isError: false,
    messageError: '',
  },
};
