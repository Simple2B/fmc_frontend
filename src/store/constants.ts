export const INTERVAL_NEWS_LETTER_POP_UP = 10000;

export const RE_POST_CODE = /^[a-zA-Z0-9 ]*$/;

export const RE_ONLY_LETTER = /^[a-zA-Z\s]*$/;

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
