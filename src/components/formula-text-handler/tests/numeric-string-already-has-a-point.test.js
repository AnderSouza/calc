import { expect } from "chai";
import { alreadyHasAPoint } from "../functions";

describe("alreadyHasAPoint function", () => {
  it("Returns true when passed number with one point in the middle.", () => {
    const expected = true;
    const actual = alreadyHasAPoint("8.25");
    expect(actual).to.equal(expected);
  });
  it("Returns true when passed number with one point in the end.", () => {
    const expected = true;
    const actual = alreadyHasAPoint("913.");
    expect(actual).to.equal(expected);
  });
  it("Returns true when passed number with one point in the beginning.", () => {
    const expected = true;
    const actual = alreadyHasAPoint(".436");
    expect(actual).to.equal(expected);
  });
  it("Returns false when passed number with no points at all", () => {
    const expected = false;
    const actual = alreadyHasAPoint("6821");
    expect(actual).to.equal(expected);
  });
});
