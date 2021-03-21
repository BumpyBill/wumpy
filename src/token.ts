export var TokenRegex = {
  NUMBER: /[0-9]/,
  ALPHABET: /[a-z]/i,
  WHITESPACE: /\s/,
  OPERATOR: /\+|\-|\/|\*/,
};

export interface Token {
  type: string;
  value?: any;
  params?: Token[];
  body?: Token[];
}
