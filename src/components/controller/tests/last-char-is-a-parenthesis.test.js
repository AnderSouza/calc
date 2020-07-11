import { expect } from "chai";
import { lastCharIsAParenthesis } from "../functions";

describe("lastCharIsAParenthesis function", () => {
  it("Returns true when the last character is an opening parenthesis.", () => {
    const expected = true;
    const actual = lastCharIsAParenthesis("25+50+(");
    expect(actual).to.equal(expected);
  });
  it("Returns true when the last character is a closing parenthesis.", () => {
    const expected = true;
    const actual = lastCharIsAParenthesis("25+50+(2x5)");
    expect(actual).to.equal(expected);
  });
  it("Returns false when the last character is a plus sign.", () => {
    const expected = false;
    const actual = lastCharIsAParenthesis("25+50+");
    expect(actual).to.equal(expected);
  });
  it("Returns false when the last character is a minus sign.", () => {
    const expected = false;
    const actual = lastCharIsAParenthesis("98x52-");
    expect(actual).to.equal(expected);
  });
  it("Returns false when the last character is a multiplication sign.", () => {
    const expected = false;
    const actual = lastCharIsAParenthesis("69x9x");
    expect(actual).to.equal(expected);
  });
  it("Returns false when the last character is a division sign.", () => {
    const expected = false;
    const actual = lastCharIsAParenthesis("3x9/");
    expect(actual).to.equal(expected);
  });
  it("Returns false when the last character is a potency sign.", () => {
    const expected = false;
    const actual = lastCharIsAParenthesis("3x3^");
    expect(actual).to.equal(expected);
  });
  it("Returns false when the last character is a number.", () => {
    const expected = false;
    const actual = lastCharIsAParenthesis("42-18");
    expect(actual).to.equal(expected);
  });
});
