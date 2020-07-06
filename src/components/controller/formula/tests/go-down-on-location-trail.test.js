import { assert } from "chai";
import { goDownOnLocationTrail } from "../functions";
import { NUMBERS, OPERATIONS } from "../../../../consts";
import Formula from "../formula";
import FormulaNumber from "../formula-number";
import FormulaOperator from "../formula-operator";

describe("goDownOnLocationTrail function", () => {
  it("Adds new position to locationTrail.", () => {
    const elements = [
      new FormulaNumber("2"),
      new FormulaOperator(OPERATIONS.ADDITION)
    ];
    const formula = new Formula(elements);
    const locationTrail = [];

    const expected = [2];
    const actual = goDownOnLocationTrail(locationTrail, formula);
    assert.sameOrderedMembers(actual, expected);
  });
  it("Throws exception when passed formula is empty.", () => {
    const elements = [];
    const formula = new Formula(elements);
    const locationTrail = [];
    const fn = () => goDownOnLocationTrail(locationTrail, formula);
    assert.throws(fn, /This formula has no elements/);
  });
});
