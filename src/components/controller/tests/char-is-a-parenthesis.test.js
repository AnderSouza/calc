import { expect } from "chai";
import { OPERATIONS } from "../../../consts";
import { charIsAParenthesis } from "../functions";

describe("charIsAParenthesis function", () => {
  it("Returns true when passed OPENING_PARENTHESIS_CHAR const", () => {
    const expected = true;
    const actual = charIsAParenthesis(OPERATIONS.OPENING_PARENTHESIS_CHAR);
    expect(actual).to.equal(expected);
  });
  it("Returns true when passed CLOSING_PARENTHESIS_CHAR const", () => {
    const expected = true;
    const actual = charIsAParenthesis(OPERATIONS.CLOSING_PARENTHESIS_CHAR);
    expect(actual).to.equal(expected);
  });
  it("Returns false when passed a regular integer.", () => {
    const expected = false;
    const actual = charIsAParenthesis(1);
    expect(actual).to.equal(expected);
  });
  it("Returns false when passed a regular char.", () => {
    const expected = false;
    const actual = charIsAParenthesis("c");
    expect(actual).to.equal(expected);
  });
  it("Returns false when passed a boolean.", () => {
    const expected = false;
    const actual = charIsAParenthesis(true);
    expect(actual).to.equal(expected);
  });
  it("Returns false when passed null.", () => {
    const expected = false;
    const actual = charIsAParenthesis(null);
    expect(actual).to.equal(expected);
  });
  it("Returns false when passed nothing.", () => {
    const expected = false;
    const actual = charIsAParenthesis();
    expect(actual).to.equal(expected);
  });
});
