// Instructions

// Given a mathematical expression as a string you must return the result as a
// number.

// Numbers

// Number may be both whole numbers and/or decimal numbers. The same goes for
// the returned result.

// Operators

// You need to support the following mathematical operators:

// Multiplication * Division / Addition + Subtraction - Operators are always
// evaluated from left-to-right, and * and / must be evaluated before + and -.

// Parentheses

// You need to support multiple levels of nested parentheses, ex. (2 / (2 +
// 3.33) * 4) - -6

// Whitespace

// There may or may not be whitespace between numbers and operators.

// An addition to this rule is that the minus sign (-) used for negating numbers
// and parentheses will never be separated by whitespace. I.e., all of the
// following are valid expressions.

// 1-1    // 0 1 -1   // 0 1- 1   // 0 1 - 1  // 0 1- -1  // 2 1 - -1 // 2

// 6 + -(4)   // 2 6 + -( -4) // 10 And the following are invalid expressions

// 1 - - 1    // Invalid 1- - 1     // Invalid 6 + - (4)  // Invalid 6 + -(- 4)
// // Invalid Validation

// You do not need to worry about validation - you will only receive valid
// mathematical expressions following the above rules.

// NOTE: Both eval and Function are disabled.

const calc = s => {
  s = s.replace(/\s/g, "");
  s = s.replace(/--/g, "+");

  let exec;

  let rParentesis = /\(([^(]*?)\)/;
  let rTerm = /(.*[^*/]\b)([+-])(.+)/;
  let rFactor = /(.+)([*/])(.+)/;
  let rDigit = /^[-+]?\d+(\.\d+)?$/;

  /* Parentesis */
  while ((exec = rParentesis.exec(s))) {
    s = s.replace(rParentesis, calc(exec[1]));
  }

  /* Sum and Subtraction */
  while ((exec = rTerm.exec(s))) {
    let leftSide = calc(exec[1]);
    let rightSide = calc(exec[3]);
    let operand = exec[2];

    let result =
      operand === "+" ? +leftSide + +rightSide : +leftSide - +rightSide;
    s = s.replace(rTerm, result);
  }

  /* Multiplication and division */
  while ((exec = rFactor.exec(s))) {
    let leftSide = calc(exec[1]);
    let rightSide = calc(exec[3]);
    let operand = exec[2];

    let result =
      operand === "*" ? +leftSide * +rightSide : +leftSide / +rightSide;
    s = s.replace(rFactor, result);
  }

  /* Value */
  if ((exec = rDigit.exec(s))) {
    return Number(exec[0]);
  }

  return s;
};
