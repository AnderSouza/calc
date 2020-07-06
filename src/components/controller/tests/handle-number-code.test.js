import { assert } from "chai";
import { handleNumberCode } from "../functions";
import { NUMBERS, OPERATIONS } from "../../../consts";

describe("handleNumberCode function", () => {
  it("Adds ZERO to the string.", () => {
    const expected = "25+50";
    const actual = handleNumberCode(NUMBERS.ZERO, "25+5");
    assert.equal(actual, expected);
  });
  it("Adds ONE to the string.", () => {
    const expected = "25+51";
    const actual = handleNumberCode(NUMBERS.ONE, "25+5");
    assert.equal(actual, expected);
  });
  it("Adds TWO to the string.", () => {
    const expected = "25+52";
    const actual = handleNumberCode(NUMBERS.TWO, "25+5");
    assert.equal(actual, expected);
  });
  it("Adds THREE to the string.", () => {
    const expected = "25+53";
    const actual = handleNumberCode(NUMBERS.THREE, "25+5");
    assert.equal(actual, expected);
  });
  it("Adds FOUR to the string.", () => {
    const expected = "25+54";
    const actual = handleNumberCode(NUMBERS.FOUR, "25+5");
    assert.equal(actual, expected);
  });
  it("Adds FIVE to the string.", () => {
    const expected = "25+55";
    const actual = handleNumberCode(NUMBERS.FIVE, "25+5");
    assert.equal(actual, expected);
  });
  it("Adds SIX to the string.", () => {
    const expected = "25+56";
    const actual = handleNumberCode(NUMBERS.SIX, "25+5");
    assert.equal(actual, expected);
  });
  it("Adds SEVEN to the string.", () => {
    const expected = "25+57";
    const actual = handleNumberCode(NUMBERS.SEVEN, "25+5");
    assert.equal(actual, expected);
  });
  it("Adds EIGHT to the string.", () => {
    const expected = "25+58";
    const actual = handleNumberCode(NUMBERS.EIGHT, "25+5");
    assert.equal(actual, expected);
  });
  it("Adds NINE to the string.", () => {
    const expected = "25+59";
    const actual = handleNumberCode(NUMBERS.NINE, "25+5");
    assert.equal(actual, expected);
  });
  it("Adds POINT to the string.", () => {
    const expected = "25+10.";
    const actual = handleNumberCode(NUMBERS.POINT, "25+10");
    assert.equal(actual, expected);
  });
  it("Throws exception when trying to add point to a string that already contains a point.", () => {
    const fn = () => handleNumberCode(NUMBERS.POINT, "25+10.");
    assert.throws(fn, /Invalid position for a point/);
  });
  it("Throws exception when trying to add point to an empty string.", () => {
    const fn = () => handleNumberCode(NUMBERS.POINT, "");
    assert.throws(fn, /Invalid position for a point/);
    
  });
  it("Throws exception when trying to add a ADDITION to the string.", () => {
    const fn = () => handleNumberCode(OPERATIONS.POINT, "2^5");
    assert.throws(fn, /Unknown number code/);
  });
});
