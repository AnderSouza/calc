import { handleCommandCode } from "../components/formula-text-handler/index.func";
import { Buttons } from "../consts";

describe("handleCommandCode", () => {
  it("clears current number from the string.", () => {
    const expected = "35x54+(20/";
    const actual = handleCommandCode(Buttons.CLEAR_ELEMENT, "35x54+(20/12.25");

    expect(actual).toBe(expected);
  });
  it("returns empty when the CLEAR command is executed.", () => {
    const expected = "";
    const actual = handleCommandCode(Buttons.CLEAR, "35x54+(20/12)");
    expect(actual).toBe(expected);
  });
  it("returns the same string when the RESULT command is executed.", () => {
    const expected = "35x54+(20/12)";
    const actual = handleCommandCode(Buttons.RESULT, "35x54+(20/12)");
    expect(actual).toBe(expected);
  });
  it("throws exception when passed a number.", () => {
    const fn = () => handleCommandCode(Buttons.ONE, "35x54+(20/12)");
    expect(fn).toThrowError(/Unknown command/);
  });
  it("throws exception when passed an operation.", () => {
    const fn = () => handleCommandCode(Buttons.ADDITION, "35x54+(20/12)");
    expect(fn).toThrowError(/Unknown command/);
  });
});
