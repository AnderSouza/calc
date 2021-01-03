import {
  isFormula,
  isNumber,
  isOperator,
  processOperation,
} from "../components/formula-builder/index.func";
import { EventKeys, Buttons } from "../consts";
import { Formula } from "../components/formula-builder/formula";
import { Number } from "../components/formula-builder/number";
import { Operator } from "../components/formula-builder/operator";

describe("processOperation function", () => {
  it("Adds new operator element to formula.", () => {
    const formula = new Formula([
      new Number(EventKeys.NINE),
      new Operator(Buttons.ADDITION),
      new Formula([new Number(EventKeys.NINE)]),
      new Operator(Buttons.SUBTRACTION),
    ]);

    const trail = [2];
    const char = EventKeys.ADDITION;

    const expected = Buttons.ADDITION;
    let element = processOperation(char, formula, trail).getElement(trail);
    element = isFormula(element) ? element.getLastElement() : new Number("0");
    const actual = isOperator(element) ? element.value : null;
    expect(actual).toBe(expected);
  });
  it("Throws exception when passed a number.", () => {
    const formula = new Formula([
      new Number(EventKeys.TWO),
      new Operator(Buttons.ADDITION),
      new Formula([new Number(EventKeys.FOUR + EventKeys.POINT)]),
    ]);

    const trail = [2];
    const char = EventKeys.TWO;

    const fn = () => processOperation(char, formula, trail);
    expect(fn).toThrowError(/The char is not an operation/);
  });
});
