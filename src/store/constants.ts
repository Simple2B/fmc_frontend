export const INTERVAL_NEWS_LETTER_POP_UP = 5000;

export const RE_POST_CODE = /^[a-zA-Z0-9 ]*$/;

export const RE_ONLY_NUMBER = /^[0-9]*$/;

export const RE_PRICE = /^\d{0,4}(\.\d{0,4})?$/;

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
