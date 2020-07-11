import { assert } from "chai";
import { handleCommandCode } from "../functions";
import { NUMBERS, OPERATIONS, COMMANDS } from "../../../consts";

describe("handleCommandCode function", () => {
  it("Throws exception when trying to execute command on an empty string.", () => {
    const fn = () => handleCommandCode(COMMANDS.CLEAR, "");
    assert.throws(fn, /Formula is empty/);
  });
  it("Clears current number from the string.", () => {
    const expected = "35x54+(20/";
    const actual = handleCommandCode(COMMANDS.CLEAR_ELEMENT, "35x54+(20/12.25");
    assert.equal(actual, expected);
  });
  it("Returns empty when the CLEAR command is executed.", () => {
    const expected = "";
    const actual = handleCommandCode(COMMANDS.CLEAR, "35x54+(20/12)");
    assert.equal(actual, expected);
  });
  it("Returns the same string when the RESULT command is executed.", () => {
    const expected = "35x54+(20/12)";
    const actual = handleCommandCode(COMMANDS.RESULT, "35x54+(20/12)");
    assert.equal(actual, expected);
  });
  it("Throws exception when passed a number.", () => {
    const fn = () => handleCommandCode(NUMBERS.ONE, "35x54+(20/12)");
    assert.throws(fn, /Unknown command/);
  });
  it("Throws exception when passed an operation.", () => {
    const fn = () => handleCommandCode(OPERATIONS.ADDITION, "35x54+(20/12)");
    assert.throws(fn, /Unknown command/);
  });
});
