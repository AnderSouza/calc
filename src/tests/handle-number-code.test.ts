import { handleNumberCode } from "../components/formula-text-handler/index.func";
import { Buttons } from "../consts";

describe("handleNumberCode", () => {
  it("adds number to the string.", () => {
    const expected = "25+51";
    const actual = handleNumberCode(Buttons.ONE, "25+5");
    expect(actual).toBe(expected);
  });
  it("Adds point to the string.", () => {
    const expected = "25+10.";
    const actual = handleNumberCode(Buttons.POINT, "25+10");
    expect(actual).toBe(expected);
  });
  it("throws exception when trying to add point to a string that already contains a point", () => {
    const fn = () => handleNumberCode(Buttons.POINT, "25+10.");
    expect(fn).toThrowError(/Invalid position for a point/);
  });
  it("throws exception when trying to add point to an empty string.", () => {
    const fn = () => handleNumberCode(Buttons.POINT, "");
    expect(fn).toThrowError(/Invalid position for a point/);
  });
  it("Throws exception when trying to add an operator", () => {
    const fn = () => handleNumberCode(Buttons.SUBTRACTION, "2^5");
    expect(fn).toThrowError(/Unknown number code/);
  });
});
