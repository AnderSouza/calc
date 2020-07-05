import { expect } from "chai";
import { replaceLastCharInString } from "../functions";

describe("replaceLastCharInString function", () => {
  it("Replaces last 'o' character in the string with a 'y'.", () => {
    const expected = "why";
    const actual = replaceLastCharInString("who", 'y');
    expect(actual).to.equal(expected);
  });
});
