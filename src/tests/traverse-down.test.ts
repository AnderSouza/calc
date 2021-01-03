import { traverseDown } from "../components/formula-builder/index.func";
import { EventKeys, Buttons } from "../consts";
import { Formula } from "../components/formula-builder/formula";
import { Number } from "../components/formula-builder/number";
import { Operator } from "../components/formula-builder/operator";

describe("traverseDown function", () => {
  it("Adds new position to trail.", () => {
    const formula = new Formula([
      new Number(EventKeys.TWO),
      new Operator(Buttons.ADDITION),
    ]);
    const trail: number[] = [];

    const expected = [2];
    const actual = traverseDown(trail, formula);
    expect(actual).toEqual(expected);
  });
  it("Adds new position to trail when passed a neste Formula.", () => {
    const formula = new Formula([
      new Number(EventKeys.TWO),
      new Operator(Buttons.ADDITION),
      new Formula([new Number(EventKeys.TWO)]),
    ]);
    const trail = [2];

    const expected = [2, 1];
    const actual = traverseDown(trail, formula);
    expect(actual).toEqual(expected);
  });
  it("Throws exception when passed formula is empty.", () => {
    const formula = new Formula([]);
    const trail: number[] = [];
    const fn = () => traverseDown(trail, formula);
    expect(fn).toThrowError(/The formula has no elements/);
  });
});
