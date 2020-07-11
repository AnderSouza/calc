import { expect } from "chai";
import { lastCharIsAOpeningParenthesis } from "../functions";

describe("lastCharIsAOpeningParenthesis function", () => {
  it("Returns true when the last character is an opening parenthesis.", () => {
    const expected = true;
    const actual = lastCharIsAOpeningParenthesis("25+50+(");
    expect(actual).to.equal(expected);
  });
  it("Returns false when the last character is a closing parenthesis.", () => {
    const expected = false;
    const actual = lastCharIsAOpeningParenthesis("25+50+(2x5)");
    expect(actual).to.equal(expected);
  });
  it("Returns false when the last character is a plus sign.", () => {
    const expected = false;
    const actual = lastCharIsAOpeningParenthesis("2x3+(4/2)+");
    expect(actual).to.equal(expected);
  });
  it("Returns false when the last character is a number.", () => {
    const expected = false;
    const actual = lastCharIsAOpeningParenthesis("3x3");
    expect(actual).to.equal(expected);
  });
});
