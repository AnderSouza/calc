import { assert } from "chai";
import { handleOperationCode } from "../functions";
import { OPERATIONS, NUMBERS } from "../../../consts";

describe("handleOperationCode function", () => {
  it("Adds ADDITION to the string.", () => {
    const expected = "25+";
    const actual = handleOperationCode(OPERATIONS.ADDITION, "25");
    assert.equal(actual, expected);
  });
  it("Adds SUBTRACTION to the string.", () => {
    const expected = "25-";
    const actual = handleOperationCode(OPERATIONS.SUBTRACTION, "25");
    assert.equal(actual, expected);
  });
  it("Adds MULTIPLICATION to the string.", () => {
    const expected = "25x";
    const actual = handleOperationCode(OPERATIONS.MULTIPLICATION, "25");
    assert.equal(actual, expected);
  });
  it("Adds DIVISION to the string.", () => {
    const expected = "25/";
    const actual = handleOperationCode(OPERATIONS.DIVISION, "25");
    assert.equal(actual, expected);
  });
  it("Adds POTENCY to the string.", () => {
    const expected = "25^";
    const actual = handleOperationCode(OPERATIONS.POTENCY, "25");
    assert.equal(actual, expected);
  });
  it("Adds OPENING_PARENTHESIS to the string.", () => {
    const expected = "25+(";
    const actual = handleOperationCode(OPERATIONS.OPENING_PARENTHESIS, "25+");
    assert.equal(actual, expected);
  });
  it("Adds CLOSING_PARENTHESIS to the string.", () => {
    const expected = "25+(2x3)";
    const actual = handleOperationCode(
      OPERATIONS.CLOSING_PARENTHESIS,
      "25+(2x3"
    );
    assert.equal(actual, expected);
  });
  it("Replaces addition with a multiplication.", () => {
    const expected = "25+(2x3)x";
    const actual = handleOperationCode(
      OPERATIONS.MULTIPLICATION,
      "25+(2x3)+"
    );
    assert.equal(actual, expected);
  });
  it("Replaces addition with a subtraction.", () => {
    const expected = "25+(2x3)-";
    const actual = handleOperationCode(
      OPERATIONS.SUBTRACTION,
      "25+(2x3)+"
    );
    assert.equal(actual, expected);
  });
  it("Replaces division with a addition.", () => {
    const expected = "25+(2x3)+";
    const actual = handleOperationCode(
      OPERATIONS.ADDITION,
      "25+(2x3)/"
    );
    assert.equal(actual, expected);
  });
  it("Throws exception when trying to add multiplication to an empty string.", () => {
    const fn = () => handleOperationCode(OPERATIONS.MULTIPLICATION, "");
    assert.throws(fn, /Cannot insert this operation at this position/);
  });
  it("Throws exception when trying to add division to an empty string.", () => {
    const fn = () => handleOperationCode(OPERATIONS.DIVISION, "");
    assert.throws(fn, /Cannot insert this operation at this position/);
  });
  it("Throws exception when trying to add potency to an empty string.", () => {
    const fn = () => handleOperationCode(OPERATIONS.POTENCY, "");
    assert.throws(fn, /Cannot insert this operation at this position/);
  });
  it("Throws exception when trying to add multiplication to a string ending in an opening parenthesis.", () => {
    const fn = () => handleOperationCode(OPERATIONS.MULTIPLICATION, "25+(");
    assert.throws(fn, /Cannot insert this operation at this position/);
  });
  it("Throws exception when trying to add division to a string ending in an opening parenthesis.", () => {
    const fn = () => handleOperationCode(OPERATIONS.DIVISION, "25+(");
    assert.throws(fn, /Cannot insert this operation at this position/);
  });
  it("Throws exception when trying to add potency to a string ending in an opening parenthesis.", () => {
    const fn = () => handleOperationCode(OPERATIONS.POTENCY, "25+(");
    assert.throws(fn, /Cannot insert this operation at this position/);
  });
  it("Throws exception when trying to replace an addition with a multiplication right after an opening parenthesis.", () => {
    const fn = () => handleOperationCode(OPERATIONS.MULTIPLICATION, "25/(+");
    assert.throws(fn, /Cannot insert this operation at this position/);
  });
  it("Throws exception when trying to add an opening parenthesis to an empty string.", () => {
    const fn = () => handleOperationCode(OPERATIONS.OPENING_PARENTHESIS, "");
    assert.throws(fn, /Cannot insert an opening parenthesis at this position/);
  });
  it("Throws exception when trying to add an opening parenthesis after a number.", () => {
    const fn = () => handleOperationCode(OPERATIONS.OPENING_PARENTHESIS, "2+5");
    assert.throws(fn, /Cannot insert an opening parenthesis at this position/);
  });
  it("Throws exception when trying to add an opening parenthesis after an opening parenthesis.", () => {
    const fn = () => handleOperationCode(OPERATIONS.OPENING_PARENTHESIS, "3x(");
    assert.throws(fn, /Cannot insert an opening parenthesis at this position/);
  });
  it("Throws exception when trying to add an opening parenthesis after a closing parenthesis.", () => {
    const fn = () => handleOperationCode(OPERATIONS.OPENING_PARENTHESIS, "3x(5+4)");
    assert.throws(fn, /Cannot insert an opening parenthesis at this position/);
  });
  it("Throws exception when trying to add a closing parenthesis to an empty string.", () => {
    const fn = () => handleOperationCode(OPERATIONS.CLOSING_PARENTHESIS, "");
    assert.throws(fn, /Cannot insert a closing parenthesis at this position/);
  });
  it("Throws exception when trying to add a closing parenthesis after an opening parenthesis.", () => {
    const fn = () => handleOperationCode(OPERATIONS.CLOSING_PARENTHESIS, "3x(");
    assert.throws(fn, /Cannot insert a closing parenthesis at this position/);
  });
  it("Throws exception when passed a number to the function.", () => {
    const fn = () => handleOperationCode(NUMBERS.ONE, "");
    assert.throws(fn, /Unknown operation code/);
  });
});
