import { expect } from "chai";
import { penultimateCharIsAOpeningParenthesis } from "../functions";

describe("penultimateCharIsAOpeningParenthesis function", () => {
  it("Returns true when the penultimate character is an opening parenthesis.", () => {
    const expected = true;
    const actual = penultimateCharIsAOpeningParenthesis("25+50+(5");
    expect(actual).to.equal(expected);
  });
  it("Returns false when the penultimate character is a closing parenthesis.", () => {
    const expected = false;
    const actual = penultimateCharIsAOpeningParenthesis("25+50+(2*5)+");
    expect(actual).to.equal(expected);
  });
  it("Returns false when the penultimate character is a plus sign.", () => {
    const expected = false;
    const actual = penultimateCharIsAOpeningParenthesis("2*3+(4/2)+5");
    expect(actual).to.equal(expected);
  });
  it("Returns false when the penultimate character is a number.", () => {
    const expected = false;
    const actual = penultimateCharIsAOpeningParenthesis("3*15");
    expect(actual).to.equal(expected);
  });
});
