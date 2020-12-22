import { assert } from "chai";
import { processNumber } from "../../functions";
import { NUMBERS, OPERATIONS } from "../../../../../consts";
import Formula from "../formula";
import FormulaNumber from "../../formula-number";
import FormulaOperator from "../../formula-operator";

describe("processNumber function", () => {
  it("Adds number character to the last number in formula.", () => {
    const formula = new Formula([new FormulaNumber(NUMBERS.TWO_CHAR)]);
    const trail = [];
    const char = NUMBERS.TWO_CHAR;

    const expected = "22";
    const actual = processNumber(char, formula, trail).getLastElement()
      .value;
    assert.equal(actual, expected);
  });
  it("Adds number character to the last number in formula through trail.", () => {
    const formula = new Formula([
      new FormulaNumber(NUMBERS.TWO_CHAR),
      new FormulaOperator(OPERATIONS.ADDITION_CHAR),
      new Formula([new FormulaNumber(NUMBERS.FOUR_CHAR)]),
    ]);
    const trail = [2];
    const char = NUMBERS.FIVE_CHAR;

    const expected = "45";
    const actual = processNumber(char, formula, trail)
      .getElement(trail)
      .getLastElement().value;
    assert.equal(actual, expected);
  });
  it("Adds new number element to formula.", () => {
    const formula = new Formula([
      new FormulaNumber(NUMBERS.TWO_CHAR),
      new FormulaOperator(OPERATIONS.ADDITION_CHAR),
      new Formula([new FormulaNumber(NUMBERS.FOUR_CHAR ), new FormulaOperator(OPERATIONS.ADDITION_CHAR)]),
    ]);

    const trail = [2];
    const char = NUMBERS.FIVE_CHAR;

    const expected = "5";
    const actual = processNumber(char, formula, trail)
      .getElement(trail)
      .getLastElement().value;
    assert.equal(actual, expected);
  });
  it("Throws exception when trying to add a point to a number that already has one .", () => {
    const formula = new Formula([
      new FormulaNumber(NUMBERS.TWO_CHAR),
      new FormulaOperator(OPERATIONS.ADDITION_CHAR),
      new Formula([new FormulaNumber(NUMBERS.FOUR_CHAR + NUMBERS.POINT_CHAR)]),
    ]);

    const trail = [2];
    const char = NUMBERS.POINT_CHAR;

    const fn = () => processNumber(char, formula, trail);
    assert.throws(fn, /Cannot insert point because the number already has one/);
  });
  it("Throws exception when trying to start a number with a point.", () => {
    const formula = new Formula([
      new FormulaNumber(NUMBERS.TWO_CHAR),
      new FormulaOperator(OPERATIONS.ADDITION_CHAR),
      new Formula([new FormulaNumber(NUMBERS.FOUR_CHAR ), new FormulaOperator(OPERATIONS.ADDITION_CHAR)]),
    ]);

    const trail = [2];
    const char = NUMBERS.POINT_CHAR;

    const fn = () => processNumber(char, formula, trail);
    assert.throws(fn, /Cannot start a number with a point/);
  });

  it("Throws exception when passed an operation.", () => {
    const formula = new Formula([
      new FormulaNumber(NUMBERS.TWO_CHAR),
      new FormulaOperator(OPERATIONS.ADDITION_CHAR),
      new Formula([new FormulaNumber(NUMBERS.FOUR_CHAR ), new FormulaOperator(OPERATIONS.ADDITION_CHAR)]),
    ]);

    const trail = [2];
    const char = OPERATIONS.ADDITION_CHAR;

    const fn = () => processNumber(char, formula, trail);
    assert.throws(fn, /The char is neither a point or a number/);
  });

  
});
