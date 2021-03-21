export interface AbstractSyntaxTree {
  left: Token;
  right: Token;
}

export interface Token {
  left?: Token;
  right?: Token;
}

export var TokenRegex = {
  NUMBER: /[0-9]/,
  ALPHABET: /[A-z]/,
};
