import { expect } from "chai";
import { lastCharIsAnOperation } from "../functions";

describe("lastCharIsAnOperation function", () => {
  it("Returns true when the last character is a plus sign.", () => {
    const expected = true;
    const actual = lastCharIsAnOperation("25+50+");
    expect(actual).to.equal(expected);
  });
  it("Returns true when the last character is a minus sign.", () => {
    const expected = true;
    const actual = lastCharIsAnOperation("98x52-");
    expect(actual).to.equal(expected);
  });
  it("Returns true when the last character is a multiplication sign.", () => {
    const expected = true;
    const actual = lastCharIsAnOperation("69x9x");
    expect(actual).to.equal(expected);
  });
  it("Returns true when the last character is a division sign.", () => {
    const expected = true;
    const actual = lastCharIsAnOperation("3x9/");
    expect(actual).to.equal(expected);
  });
  it("Returns true when the last character is a potency sign.", () => {
    const expected = true;
    const actual = lastCharIsAnOperation("3x3^");
    expect(actual).to.equal(expected);
  });
  it("Returns false when the last character is a number.", () => {
    const expected = false;
    const actual = lastCharIsAnOperation("42-18");
    expect(actual).to.equal(expected);
  });
  it("Returns false when the last character is a parenthesis.", () => {
    const expected = false;
    const actual = lastCharIsAnOperation("2x3+(4/2)");
    expect(actual).to.equal(expected);
  });
});
