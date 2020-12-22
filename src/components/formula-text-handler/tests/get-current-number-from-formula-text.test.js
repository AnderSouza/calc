import { expect } from "chai";
import { getCurrentNumberFromFormula } from "../functions";

describe("getCurrentNumberFromFormula function", () => {
  it("Returns the number when passed a numeric string", () => {
    const expected = "43";
    const actual = getCurrentNumberFromFormula("43");
    expect(actual).to.equal(expected);
  });
  it("Returns '275' when passed the string '500+275'", () => {
    const expected = "275";
    const actual = getCurrentNumberFromFormula("500+275");
    expect(actual).to.equal(expected);
  });
  it("Returns the empty string when passed the string '315-125-'", () => {
    const expected = "";
    const actual = getCurrentNumberFromFormula("315-125-");
    expect(actual).to.equal(expected);
  });
  it("Returns '10.75' when passed the string '19.50+10.75'", () => {
    const expected = "10.75";
    const actual = getCurrentNumberFromFormula("19.50+10.75");
    expect(actual).to.equal(expected);
  });
});
