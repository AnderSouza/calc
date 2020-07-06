import { expect } from "chai";
import { lastCharIsANumber } from "../functions";

describe("lastCharIsANumber function", () => {
  it("Returns true when the last character is a '0'.", () => {
    const expected = true;
    const actual = lastCharIsANumber("200");
    expect(actual).to.equal(expected);
  });
  it("Returns true when the last character is a '1'.", () => {
    const expected = true;
    const actual = lastCharIsANumber("11");
    expect(actual).to.equal(expected);
  });
  it("Returns true when the last character is a '2'.", () => {
    const expected = true;
    const actual = lastCharIsANumber("112");
    expect(actual).to.equal(expected);
  });
  it("Returns true when the last character is a '3'.", () => {
    const expected = true;
    const actual = lastCharIsANumber("25*87+53");
    expect(actual).to.equal(expected);
  });
  it("Returns true when the last character is a '4'.", () => {
    const expected = true;
    const actual = lastCharIsANumber("25-14");
    expect(actual).to.equal(expected);
  });
  it("Returns true when the last character is a '5'.", () => {
    const expected = true;
    const actual = lastCharIsANumber("25+25");
    expect(actual).to.equal(expected);
  });
  it("Returns true when the last character is a '6'.", () => {
    const expected = true;
    const actual = lastCharIsANumber("6*6");
    expect(actual).to.equal(expected);
  });
  it("Returns true when the last character is a '7'.", () => {
    const expected = true;
    const actual = lastCharIsANumber("93+7");
    expect(actual).to.equal(expected);
  });
  it("Returns true when the last character is a '8'.", () => {
    const expected = true;
    const actual = lastCharIsANumber("2^8");
    expect(actual).to.equal(expected);
  });
  it("Returns true when the last character is a '9'.", () => {
    const expected = true;
    const actual = lastCharIsANumber("3*9");
    expect(actual).to.equal(expected);
  });
  it("Returns false when the last character is a parenthesis.", () => {
    const expected = false;
    const actual = lastCharIsANumber("42-18+(2*3)");
    expect(actual).to.equal(expected);
  });
  it("Returns false when the last character is a plus sign.", () => {
    const expected = false;
    const actual = lastCharIsANumber("2*3+(4/2)+");
    expect(actual).to.equal(expected);
  });
});
