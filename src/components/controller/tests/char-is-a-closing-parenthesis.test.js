import { expect } from "chai";
import { OPERATIONS } from "../../../consts";
import { charIsAClosingParenthesis } from "../functions";

describe("charIsAClosingParenthesis function", () => {
  it("Returns true when passed CLOSING_PARENTHESIS_CHAR const", () => {
    const expected = true;
    const actual = charIsAClosingParenthesis(
      OPERATIONS.CLOSING_PARENTHESIS_CHAR
    );
    expect(actual).to.equal(expected);
  });
  it("Returns false when passed a regular integer.", () => {
    const expected = false;
    const actual = charIsAClosingParenthesis(1);
    expect(actual).to.equal(expected);
  });
  it("Returns false when passed a regular char.", () => {
    const expected = false;
    const actual = charIsAClosingParenthesis("c");
    expect(actual).to.equal(expected);
  });
  it("Returns false when passed a boolean.", () => {
    const expected = false;
    const actual = charIsAClosingParenthesis(true);
    expect(actual).to.equal(expected);
  });
  it("Returns false when passed null.", () => {
    const expected = false;
    const actual = charIsAClosingParenthesis(null);
    expect(actual).to.equal(expected);
  });
  it("Returns false when passed nothing.", () => {
    const expected = false;
    const actual = charIsAClosingParenthesis();
    expect(actual).to.equal(expected);
  });
});
