import { assert } from "chai";
import { processOperation } from "../../functions";
import { NUMBERS, OPERATIONS } from "../../../../../consts";
import Formula from "../formula";
import FormulaNumber from "../../formula-number";
import FormulaOperator from "../../formula-operator";

describe("processOperation function", () => {
  it("Adds new operator element to formula.", () => {
    const formula = new Formula([
      new FormulaNumber(NUMBERS.TWO_CHAR),
      new FormulaOperator(OPERATIONS.ADDITION),
      new Formula([new FormulaNumber(NUMBERS.FOUR_CHAR)]),
      new FormulaOperator(OPERATIONS.SUBTRACTION)
    ]);

    const trail = [2];
    const char = OPERATIONS.ADDITION_CHAR;

    const expected = OPERATIONS.ADDITION;
    const actual = processOperation(char, formula, trail)
      .getElement(trail)
      .getLastElement().value;
    assert.equal(actual, expected);
  });
  it("Throws exception when passed a number.", () => {
    const formula = new Formula([
      new FormulaNumber(NUMBERS.TWO_CHAR),
      new FormulaOperator(OPERATIONS.ADDITION),
      new Formula([new FormulaNumber(NUMBERS.FOUR_CHAR + NUMBERS.POINT_CHAR)]),
    ]);

    const trail = [2];
    const char = OPERATIONS.TWO_CHAR;

    const fn = () => processOperation(char, formula, trail);
    assert.throws(fn, /The char is not an operation/);
  });
});



