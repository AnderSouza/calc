import { assert } from "chai";
import { goDownOnLocationTrail } from "../../functions";
import { NUMBERS, OPERATIONS } from "../../../../../consts";
import Formula from "../../formula";
import FormulaNumber from "../../formula-number";
import FormulaOperator from "../../formula-operator";

describe("goDownOnLocationTrail function", () => {
  it("Adds new position to locationTrail.", () => {
    const formula = new Formula([
      new FormulaNumber(NUMBERS.TWO_CHAR),
      new FormulaOperator(OPERATIONS.ADDITION)
    ]);
    const locationTrail = [];

    const expected = [2];
    const actual = goDownOnLocationTrail(locationTrail, formula);
    assert.sameOrderedMembers(actual, expected);
  });
  it("Adds new position to locationTrail when passed a neste Formula.", () => {
    const formula = new Formula([
      new FormulaNumber(NUMBERS.TWO_CHAR),
      new FormulaOperator(OPERATIONS.ADDITION),
      new Formula([
        new FormulaNumber(NUMBERS.TWO_CHAR)
      ])
    ]);
    const locationTrail = [2];

    const expected = [2, 1];
    const actual = goDownOnLocationTrail(locationTrail, formula);
    assert.sameOrderedMembers(actual, expected);
  });
  it("Throws exception when passed formula is empty.", () => {
    const formula = new Formula([]);
    const locationTrail = [];
    const fn = () => goDownOnLocationTrail(locationTrail, formula);
    assert.throws(fn, /The formula has no elements/);
  });
});
