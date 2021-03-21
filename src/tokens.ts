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

function abstractSyntaxTree(input: string): AbstractSyntaxTree {
  throw new Error("Function not implemented");
}

function generateCode(tokens: AbstractSyntaxTree): string {
  throw new Error("Function not implemented");
}
