import { expect } from "chai";
import { getPenultimateChar } from "../functions";

describe("getPenultimateChar function", () => {
  it("Gets the penultimate character of 'alligator'.", () => {
    const expected = "o";
    const actual = getPenultimateChar("alligator");
    expect(actual).to.equal(expected);
  });
  it("Returns no character when passed an empty string'.", () => {
    const expected = "";
    const actual = getPenultimateChar("");
    expect(actual).to.equal(expected);
  });
});
