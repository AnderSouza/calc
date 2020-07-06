import { expect } from "chai";
import { numericStringAlreadyHasAPoint } from "../functions";

describe("numericStringAlreadyHasAPoint function", () => {
  it("Returns true when passed number with one point in the middle.", () => {
    const expected = true;
    const actual = numericStringAlreadyHasAPoint("8.25");
    expect(actual).to.equal(expected);
  });
  it("Returns true when passed number with one point in the end.", () => {
    const expected = true;
    const actual = numericStringAlreadyHasAPoint("913.");
    expect(actual).to.equal(expected);
  });
  it("Returns true when passed number with one point in the beginning.", () => {
    const expected = true;
    const actual = numericStringAlreadyHasAPoint(".436");
    expect(actual).to.equal(expected);
  });
  it("Returns false when passed number with no points at all", () => {
    const expected = false;
    const actual = numericStringAlreadyHasAPoint("6821");
    expect(actual).to.equal(expected);
  });
});
