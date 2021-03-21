import { log, LoggerCode, LoggerType } from "./logger";
import { TokenRegex, Token } from "./token";

export function tokenizer(input: string): Token[] {
  var current = 0;
  var char = "";
  var tokens: Token[] = [];

  while (current < input.length) {
    char = input[current];

    // Whitespace
    if (TokenRegex.WHITESPACE.test(char)) {
      current++;
      continue;
    }

    // Parentheses
    if (char == "(") {
      tokens.push({
        type: "left_paren",
        value: char,
      });

      current++;
      continue;
    }
    if (char == ")") {
      tokens.push({
        type: "right_paren",
        value: char,
      });

      current++;
      continue;
    }

    // Numbers
    if (TokenRegex.NUMBER.test(char)) {
      var value = "";
      while (TokenRegex.NUMBER.test(char)) {
        value += char;
        current++;
        char = input[current];
      }

      tokens.push({
        type: "number",
        value,
      });
    }

    // Alphabet
    if (TokenRegex.ALPHABET.test(char)) {
      var value = "";
      while (TokenRegex.ALPHABET.test(char)) {
        value += char;
        current++;
        char = input[current];
      }

      tokens.push({
        type: "identifier",
        value,
      });
    }

    // Brackets

    if (char == "[") {
      tokens.push({
        type: "left_bracket",
        value: char,
      });

      current++;
      continue;
    }
    if (char == "]") {
      tokens.push({
        type: "right_bracket",
        value: char,
      });

      current++;
      continue;
    }

    // Comma
    if (char == ",") {
      tokens.push({
        type: "comma",
        value: char,
      });

      current++;
      continue;
    }

    // Curly Brackets

    if (char == "{") {
      tokens.push({
        type: "left_curly",
        value: char,
      });

      current++;
      continue;
    }
    if (char == "}") {
      tokens.push({
        type: "right_curly",
        value: char,
      });

      current++;
      continue;
    }

    // Equals
    if (char == "=") {
      tokens.push({
        type: "equals",
        value: char,
      });

      current++;
      continue;
    }

    // Semicolon

    if (char == ";") {
      tokens.push({
        type: "semicolon",
        value: char,
      });

      current++;
      continue;
    }

    // Full stop

    if (char == ".") {
      tokens.push({
        type: "full_stop",
        value: char,
      });

      current++;
      continue;
    }

    // Operators

    if (TokenRegex.OPERATOR.test(char)) {
      tokens.push({
        type: "operator",
        value: char,
      });

      current++;
      continue;
    }

    // End of loop
  }

  return tokens;
}

export function abstractSyntaxTree(tokens: Token[]): Token {
  var current = 0;
  function walk(): Token {
    var token = tokens[current];

    if (token.type == "number") {
      current++;
      return {
        type: "NumberLiteral",
        value: token.value,
      };
    }

    if (token.type == "left_paren") {
      current++;
      token = tokens[current];
      var node: Token = {
        type: "CallExpression",
        value: token.value,
        params: [],
      };

      current++;
      token = tokens[current];

      while (token.type != "right_paren") {
        node.params?.push(walk());
        token = tokens[current];
      }

      console.log(node);

      current++;
      return node;
    }

    if (token.type == "operator") {
      current++;
      return {
        type: "Operator",
        value: token.value,
      };
    }

    log(
      `Unknown type for "${token.value}"`,
      LoggerType.ERROR,
      LoggerCode.SYNTAX_ERROR
    );

    return {
      type: "ERROR",
      value: "ERROR",
    };
  }

  var ast: Token = {
    type: "Program",
    body: [],
  };

  while (current < tokens.length) {
    ast.body?.push(walk());
  }

  return ast;
}

export function transformer(ast: Token): Token {
  throw new Error("Function not implemented");
}

export function generateCode(ast: Token): string {
  throw new Error("Function not implemented");
}
