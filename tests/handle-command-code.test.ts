import { handleCommandCode } from "../src/components/formula-text-handler/index.func";
import { BUTTONS } from "../src/consts";

describe("handleCommandCode", () => {
  it("throws exception when trying to execute command on an empty string.", () => {
    const fn = () => handleCommandCode(BUTTONS.CLEAR, "");
    expect(fn).toThrowError(/Formula is empty/);
  });
  it("clears current number from the string.", () => {
    const expected = "35x54+(20/";
    const actual = handleCommandCode(BUTTONS.CLEAR_ELEMENT, "35x54+(20/12.25");

    expect(actual).toBe(expected);
  });
  it("returns empty when the CLEAR command is executed.", () => {
    const expected = "";
    const actual = handleCommandCode(BUTTONS.CLEAR, "35x54+(20/12)");
    expect(actual).toBe(expected);
  });
  it("returns the same string when the RESULT command is executed.", () => {
    const expected = "35x54+(20/12)";
    const actual = handleCommandCode(BUTTONS.RESULT, "35x54+(20/12)");
    expect(actual).toBe(expected);
  });
  it("throws exception when passed a number.", () => {
    const fn = () => handleCommandCode(BUTTONS.ONE, "35x54+(20/12)");
    expect(fn).toThrowError(/Unknown command/);
  });
  it("throws exception when passed an operation.", () => {
    const fn = () => handleCommandCode(BUTTONS.ADDITION, "35x54+(20/12)");
    expect(fn).toThrowError(/Unknown command/);
  });
});
