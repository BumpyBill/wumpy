#!/usr/bin/env node

import { log, LoggerType, LoggerCode } from "./logger";
import { readFileSync, writeFileSync } from "fs";
import { Token } from "./token";
import {
  abstractSyntaxTree,
  generateCode,
  tokenizer,
  transformer,
} from "./compiler";
import chalk from "chalk";

main();

function main(): void {
  const inputFile: string | null = process.argv[2];
  const outputFile: string | null = process.argv[3];

  if (!inputFile || !outputFile) {
    log(
      `Invalid input/output file; please provide an input and output, ie: ${chalk.black.bgWhite(
        "wumpy main.wumpy main.asm"
      )}`,
      LoggerType.ERROR,
      LoggerCode.INVALID_INPUT_OR_OUTPUT_FILE
    );

    return;
  } else {
    var input: string = "";
    try {
      input = readFileSync(inputFile, "utf8");
    } catch (e) {
      log(
        `There was an error reading the input file; this might be because the file does not exist (More Information: ${chalk.black.bgWhite(
          e.message
        )})`,
        LoggerType.ERROR,
        LoggerCode.FS_PROBLEM
      );

      return;
    }

    var ast: Token;
    var output: string = "";
    var tokens: Token[] = [];
    var newAst: Token;

    try {
      tokens = tokenizer(input);
      ast = abstractSyntaxTree(tokens);

      newAst = transformer(ast);
      output = generateCode(newAst);
    } catch (e) {
      log(
        `There was an error compiling; this may not be a problem with your code (More Information: ${chalk.black.bgWhite(
          e.message
        )})`,
        LoggerType.ERROR,
        LoggerCode.COMPILE_ERROR
      );

      return;
    }

    try {
      writeFileSync(outputFile, output);
      log(chalk.bold("Finished compiling"), LoggerType.LOG, LoggerCode.GOOD);
    } catch (e) {
      log(
        `There was an error writing to the output file (More Information: ${chalk.black.bgWhite(
          e.message
        )})`,
        LoggerType.ERROR,
        LoggerCode.FS_PROBLEM
      );

      return;
    }
  }
}
