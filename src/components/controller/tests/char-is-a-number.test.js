import { expect } from "chai";
import { NUMBERS } from "../../../consts";
import { charIsANumber } from "../functions";

describe("CharIsANumber function", () => {
  it("Returns true when passed ZERO_CHAR const.", () => {
    const expected = true;
    const actual = charIsANumber(NUMBERS.ZERO_CHAR);
    expect(actual).to.equal(expected);
  });
  it("Returns true when passed ONE_CHAR const.", () => {
    const expected = true;
    const actual = charIsANumber(NUMBERS.ONE_CHAR);
    expect(actual).to.equal(expected);
  });
  it("Returns true when passed TWO_CHAR const.", () => {
    const expected = true;
    const actual = charIsANumber(NUMBERS.TWO_CHAR);
    expect(actual).to.equal(expected);
  });
  it("Returns true when passed THREE_CHAR const.", () => {
    const expected = true;
    const actual = charIsANumber(NUMBERS.THREE_CHAR);
    expect(actual).to.equal(expected);
  });
  it("Returns true when passed FOUR_CHAR const.", () => {
    const expected = true;
    const actual = charIsANumber(NUMBERS.FOUR_CHAR);
    expect(actual).to.equal(expected);
  });
  it("Returns true when passed FIVE_CHAR const.", () => {
    const expected = true;
    const actual = charIsANumber(NUMBERS.FIVE_CHAR);
    expect(actual).to.equal(expected);
  });
  it("Returns true when passed SIX_CHAR const.", () => {
    const expected = true;
    const actual = charIsANumber(NUMBERS.SIX_CHAR);
    expect(actual).to.equal(expected);
  });
  it("Returns true when passed SEVEN_CHAR const.", () => {
    const expected = true;
    const actual = charIsANumber(NUMBERS.SEVEN_CHAR);
    expect(actual).to.equal(expected);
  });
  it("Returns true when passed EIGHT_CHAR const.", () => {
    const expected = true;
    const actual = charIsANumber(NUMBERS.EIGHT_CHAR);
    expect(actual).to.equal(expected);
  });
  it("Returns true when passed NINE_CHAR const.", () => {
    const expected = true;
    const actual = charIsANumber(NUMBERS.NINE_CHAR);
    expect(actual).to.equal(expected);
  });
  it("Returns false when passed a regular integer.", () => {
    const expected = false;
    const actual = charIsANumber(1);
    expect(actual).to.equal(expected);
  });
  it("Returns false when passed a regular char.", () => {
    const expected = false;
    const actual = charIsANumber("c");
    expect(actual).to.equal(expected);
  });
  it("Returns false when passed a boolean.", () => {
    const expected = false;
    const actual = charIsANumber(true);
    expect(actual).to.equal(expected);
  });
  it("Returns false when passed null.", () => {
    const expected = false;
    const actual = charIsANumber(null);
    expect(actual).to.equal(expected);
  });
  it("Returns false when passed nothing.", () => {
    const expected = false;
    const actual = charIsANumber();
    expect(actual).to.equal(expected);
  });
});
