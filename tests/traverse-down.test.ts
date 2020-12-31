import { traverseDown } from "../src/components/formula-evaluator/index.func";
import { EVENT_KEYS } from "../src/consts";
import Formula from "../src/components/formula-evaluator/formula";
import FormulaNumber from "../src/components/formula-evaluator/number";
import FormulaOperator from "../src/components/formula-evaluator/operator";

describe("traverseDown function", () => {
  it("Adds new position to trail.", () => {
    const formula = new Formula([
      new FormulaNumber(EVENT_KEYS.TWO),
      new FormulaOperator(EVENT_KEYS.ADDITION),
    ]);
    const trail = [];

    const expected = [2];
    const actual = traverseDown(trail, formula);
    expect(actual).toEqual(expected);
  });
  it("Adds new position to trail when passed a neste Formula.", () => {
    const formula = new Formula([
      new FormulaNumber(EVENT_KEYS.TWO),
      new FormulaOperator(EVENT_KEYS.ADDITION),
      new Formula([new FormulaNumber(EVENT_KEYS.TWO)]),
    ]);
    const trail = [2];

    const expected = [2, 1];
    const actual = traverseDown(trail, formula);
    expect(actual).toEqual(expected);
  });
  it("Throws exception when passed formula is empty.", () => {
    const formula = new Formula([]);
    const trail = [];
    const fn = () => traverseDown(trail, formula);
    expect(fn).toThrowError(/The formula has no elements/);
  });
});
