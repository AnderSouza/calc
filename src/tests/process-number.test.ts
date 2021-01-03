import {
  processNumber,
  isFormula,
  isNumber,
} from "./../components/formula-builder/index.func";
import { EventKeys, Buttons } from "../consts";
import { Formula } from "../components/formula-builder/formula";
import { Number } from "../components/formula-builder/number";
import { Operator } from "../components/formula-builder/operator";

describe("processNumber function", () => {
  it("Adds number character to the last number in formula.", () => {
    const formula = new Formula([new Number(EventKeys.TWO)]);
    const trail: number[] = [];
    const char = EventKeys.TWO;

    const expected = "22";
    let element = processNumber(char, formula, trail).getLastElement();
    const actual = isNumber(element) ? element.value : null;
    expect(actual).toBe(expected);
  });
  it("Adds number character to the last number in formula through trail.", () => {
    const formula = new Formula([
      new Number(EventKeys.TWO),
      new Operator(Buttons.ADDITION),
      new Formula([new Number(EventKeys.FOUR)]),
    ]);
    const trail = [2];
    const char = EventKeys.FIVE;

    const expected = "45";
    let element = processNumber(char, formula, trail).getElement(trail);
    element = isFormula(element) ? element.getLastElement() : new Number("0");

    const actual = isNumber(element) ? element.value : null;
    expect(actual).toBe(expected);
  });
  it("Adds new number element to formula.", () => {
    const formula = new Formula([
      new Number(EventKeys.TWO),
      new Operator(Buttons.ADDITION),
      new Formula([new Number(EventKeys.FOUR), new Operator(Buttons.ADDITION)]),
    ]);

    const trail = [2];
    const char = EventKeys.FIVE;

    const expected = "5";
    let element = processNumber(char, formula, trail).getElement(trail);
    element = isFormula(element) ? element.getLastElement() : new Number("0");
    const actual = isNumber(element) ? element.value : null;
    expect(actual).toBe(expected);
  });
  it("Throws exception when trying to add a point to a number that already has one .", () => {
    const formula = new Formula([
      new Number(EventKeys.TWO),
      new Operator(Buttons.ADDITION),
      new Formula([new Number(EventKeys.FOUR + EventKeys.POINT)]),
    ]);

    const trail = [2];
    const char = EventKeys.POINT;

    const fn = () => processNumber(char, formula, trail);
    expect(fn).toThrowError(
      /Cannot insert point because the number already has one/
    );
  });
  it("Throws exception when trying to start a number with a point.", () => {
    const formula = new Formula([
      new Number(EventKeys.TWO),
      new Operator(Buttons.ADDITION),
      new Formula([new Number(EventKeys.FOUR), new Operator(Buttons.ADDITION)]),
    ]);

    const trail = [2];
    const char = EventKeys.POINT;

    const fn = () => processNumber(char, formula, trail);
    expect(fn).toThrowError(/Cannot start a number with a point/);
  });

  it("Throws exception when passed an operation.", () => {
    const formula = new Formula([
      new Number(EventKeys.TWO),
      new Operator(Buttons.ADDITION),
      new Formula([
        new Number(EventKeys.FOUR),
        new Operator(Buttons.ADDITION),
      ]),
    ]);

    const trail = [2];
    const char = EventKeys.ADDITION;

    const fn = () => processNumber(char, formula, trail);
    expect(fn).toThrowError(/The char is neither a point or a number/);
  });
});
