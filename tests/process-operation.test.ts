import { processOperation } from "../src/components/formula-evaluator/index.func";
import { EVENT_KEYS, BUTTONS } from "../src/consts";
import Formula from "../src/components/formula-evaluator/formula";
import FormulaNumber from "../src/components/formula-evaluator/number";
import FormulaOperator from "../src/components/formula-evaluator/operator";

describe("processOperation function", () => {
  it("Adds new operator element to formula.", () => {
    const formula = new Formula([
      new FormulaNumber(EVENT_KEYS.NINE),
      new FormulaOperator(EVENT_KEYS.ADDITION),
      new Formula([new FormulaNumber(EVENT_KEYS.NINE)]),
      new FormulaOperator(EVENT_KEYS.SUBTRACTION),
    ]);

    const trail = [2];
    const char = EVENT_KEYS.ADDITION;

    const expected = BUTTONS.ADDITION;
    const actual = processOperation(char, formula, trail)
      .getElement(trail)
      .getLastElement().value;
    expect(actual).toBe(expected);
  });
  it("Throws exception when passed a number.", () => {
    const formula = new Formula([
      new FormulaNumber(EVENT_KEYS.TWO),
      new FormulaOperator(EVENT_KEYS.ADDITION),
      new Formula([new FormulaNumber(EVENT_KEYS.FOUR + EVENT_KEYS.POINT)]),
    ]);

    const trail = [2];
    const char = EVENT_KEYS.TWO;

    const fn = () => processOperation(char, formula, trail);
    expect(fn).toThrowError(/The char is not an operation/);
  });
});
