import { expect } from "chai";
import { NUMBERS } from "../../../consts";
import { charIsAPoint } from "../functions";

describe("charIsAPoint function", () => {
  it("Returns true when passed POINT_CHAR const", () => {
    const expected = true;
    const actual = charIsAPoint(NUMBERS.POINT_CHAR);
    expect(actual).to.equal(expected);
  });
  it("Returns false when passed a regular integer.", () => {
    const expected = false;
    const actual = charIsAPoint(1);
    expect(actual).to.equal(expected);
  });
  it("Returns false when passed a regular char.", () => {
    const expected = false;
    const actual = charIsAPoint("c");
    expect(actual).to.equal(expected);
  });
  it("Returns false when passed a boolean.", () => {
    const expected = false;
    const actual = charIsAPoint(true);
    expect(actual).to.equal(expected);
  });
  it("Returns false when passed null.", () => {
    const expected = false;
    const actual = charIsAPoint(null);
    expect(actual).to.equal(expected);
  });
  it("Returns false when passed nothing.", () => {
    const expected = false;
    const actual = charIsAPoint();
    expect(actual).to.equal(expected);
  });
});
