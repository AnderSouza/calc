import { assert } from "chai";
import { charIsPoint } from "../functions";
import { NUMBERS } from "./../../../../consts";

describe("charIsPoint function", () => {
  it("Returns true when passed POINT_CHAR.", () => {
    const expected = true;
    const actual = charIsPoint(NUMBERS.POINT_CHAR);
    assert.equal(actual, expected);
  });
  it("Returns false when passed a number.", () => {
    const expected = false;
    const actual = charIsPoint("25");
    assert.equal(actual, expected);
  });
  it("Returns false when passed empty string.", () => {
    const expected = false;
    const actual = charIsPoint("");
    assert.equal(actual, expected);
  });
});
