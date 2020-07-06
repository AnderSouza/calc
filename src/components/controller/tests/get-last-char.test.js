import { expect } from "chai";
import { getLastChar } from "../functions";

describe("getLastChar function", () => {
  it("Gets the last character of 'alligator'.", () => {
    const expected = "r";
    const actual = getLastChar("alligator");
    expect(actual).to.equal(expected);
  });
  it("Returns no character when passed an empty string'.", () => {
    const expected = "";
    const actual = getLastChar("");
    expect(actual).to.equal(expected);
  });
});
