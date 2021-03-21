#!/usr/bin/env node

import { log, LoggerType, LoggerCode } from "./logger/logger";
import { readFileSync, writeFileSync } from "fs";
import { AbstractSyntaxTree } from "./tokens";

const inputFile: string | null = process.argv[2];
const outputFile: string | null = process.argv[3];

if (!inputFile || !outputFile) {
  log(
    "Invalid input/output file",
    LoggerType.ERROR,
    LoggerCode.INVALID_INPUT_OR_OUTPUT_FILE
  );
} else {
  var input: string = "";
  try {
    input = readFileSync(inputFile, "utf8");
  } catch (e) {
    log(
      "There was an error reading the input file; this might be because the file does not exist",
      LoggerType.ERROR,
      LoggerCode.FS_PROBLEM
    );
  }

  const tokens: AbstractSyntaxTree = abstractSyntaxTree(input);
  const output: string = generateCode(tokens);

  writeFileSync(outputFile, output);
}
function abstractSyntaxTree(input: string): AbstractSyntaxTree {
  throw new Error("Function not implemented.");
}

function generateCode(tokens: AbstractSyntaxTree): string {
  throw new Error("Function not implemented.");
}
