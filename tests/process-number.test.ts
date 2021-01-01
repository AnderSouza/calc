import { processNumber } from "../src/components/formula-evaluator/index.func";
import { EVENT_KEYS } from "../src/consts";
import Formula from "../src/components/formula-evaluator/formula";
import FormulaNumber from "../src/components/formula-evaluator/number";
import FormulaOperator from "../src/components/formula-evaluator/operator";

describe("processNumber function", () => {
  it("Adds number character to the last number in formula.", () => {
    const formula = new Formula([new FormulaNumber(EVENT_KEYS.TWO)]);
    const trail = [];
    const char = EVENT_KEYS.TWO;

    const expected = "22";
    const actual = processNumber(char, formula, trail).getLastElement().value;
    expect(actual).toBe(expected);
  });
  it("Adds number character to the last number in formula through trail.", () => {
    const formula = new Formula([
      new FormulaNumber(EVENT_KEYS.TWO),
      new FormulaOperator(EVENT_KEYS.ADDITION),
      new Formula([new FormulaNumber(EVENT_KEYS.FOUR)]),
    ]);
    const trail = [2];
    const char = EVENT_KEYS.FIVE;

    const expected = "45";
    const actual = processNumber(char, formula, trail)
      .getElement(trail)
      .getLastElement().value;
    expect(actual).toBe(expected);
  });
  it("Adds new number element to formula.", () => {
    const formula = new Formula([
      new FormulaNumber(EVENT_KEYS.TWO),
      new FormulaOperator(EVENT_KEYS.ADDITION),
      new Formula([
        new FormulaNumber(EVENT_KEYS.FOUR),
        new FormulaOperator(EVENT_KEYS.ADDITION),
      ]),
    ]);

    const trail = [2];
    const char = EVENT_KEYS.FIVE;

    const expected = "5";
    const actual = processNumber(char, formula, trail)
      .getElement(trail)
      .getLastElement().value;
    expect(actual).toBe(expected);
  });
  it("Throws exception when trying to add a point to a number that already has one .", () => {
    const formula = new Formula([
      new FormulaNumber(EVENT_KEYS.TWO),
      new FormulaOperator(EVENT_KEYS.ADDITION),
      new Formula([new FormulaNumber(EVENT_KEYS.FOUR + EVENT_KEYS.POINT)]),
    ]);

    const trail = [2];
    const char = EVENT_KEYS.POINT;

    const fn = () => processNumber(char, formula, trail);
    expect(fn).toThrowError(
      /Cannot insert point because the number already has one/
    );
  });
  it("Throws exception when trying to start a number with a point.", () => {
    const formula = new Formula([
      new FormulaNumber(EVENT_KEYS.TWO),
      new FormulaOperator(EVENT_KEYS.ADDITION),
      new Formula([
        new FormulaNumber(EVENT_KEYS.FOUR),
        new FormulaOperator(EVENT_KEYS.ADDITION),
      ]),
    ]);

    const trail = [2];
    const char = EVENT_KEYS.POINT;

    const fn = () => processNumber(char, formula, trail);
    expect(fn).toThrowError(/Cannot start a number with a point/);
  });

  it("Throws exception when passed an operation.", () => {
    const formula = new Formula([
      new FormulaNumber(EVENT_KEYS.TWO),
      new FormulaOperator(EVENT_KEYS.ADDITION),
      new Formula([
        new FormulaNumber(EVENT_KEYS.FOUR),
        new FormulaOperator(EVENT_KEYS.ADDITION),
      ]),
    ]);

    const trail = [2];
    const char = EVENT_KEYS.ADDITION;

    const fn = () => processNumber(char, formula, trail);
    expect(fn).toThrowError(/The char is neither a point or a number/);
  });
});
