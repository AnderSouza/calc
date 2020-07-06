import { assert } from "chai";
import { goUpOnLocationTrail } from "../functions";
import { NUMBERS, OPERATIONS } from "../../../../consts";
import Formula from "../formula";
import FormulaNumber from "../formula-number";
import FormulaOperator from "../formula-operator";

describe("goUpOnLocationTrail function", () => {
  it("Returns true when passed POINT_CHAR.", () => {
    const elements = [
      new FormulaNumber("2"),
      new FormulaOperator(OPERATIONS.ADDITION)
    ];
    const formula = new Formula(elements);
    const expected = [2];
    const actual = goUpOnLocationTrail([], formula);
    assert.equal(actual, expected);
  });
  it("Returns false when passed a number.", () => {
    const expected = false;
    const actual = goUpOnLocationTrail("25");
    assert.equal(actual, expected);
  });
  it("Returns false when passed empty string.", () => {
    const expected = false;
    const actual = goUpOnLocationTrail("");
    assert.equal(actual, expected);
  });
});
