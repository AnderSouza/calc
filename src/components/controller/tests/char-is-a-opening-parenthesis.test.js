import { expect } from "chai";
import { OPERATIONS } from "../../../consts";
import { charIsAOpeningParenthesis } from "../functions";

describe("charIsAOpeningParenthesis function", () => {
  it("Returns true when passed OPENING_PARENTHESIS_CHAR const", () => {
    const expected = true;
    const actual = charIsAOpeningParenthesis(
      OPERATIONS.OPENING_PARENTHESIS_CHAR
    );
    expect(actual).to.equal(expected);
  });
  it("Returns false when passed a regular integer.", () => {
    const expected = false;
    const actual = charIsAOpeningParenthesis(1);
    expect(actual).to.equal(expected);
  });
  it("Returns false when passed a regular char.", () => {
    const expected = false;
    const actual = charIsAOpeningParenthesis("c");
    expect(actual).to.equal(expected);
  });
  it("Returns false when passed a boolean.", () => {
    const expected = false;
    const actual = charIsAOpeningParenthesis(true);
    expect(actual).to.equal(expected);
  });
  it("Returns false when passed null.", () => {
    const expected = false;
    const actual = charIsAOpeningParenthesis(null);
    expect(actual).to.equal(expected);
  });
  it("Returns false when passed nothing.", () => {
    const expected = false;
    const actual = charIsAOpeningParenthesis();
    expect(actual).to.equal(expected);
  });
});
