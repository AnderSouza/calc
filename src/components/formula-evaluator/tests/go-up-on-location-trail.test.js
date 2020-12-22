import { assert } from "chai";
import { traverseUp } from "../../functions";

describe("traverseUp function", () => {
  it("Remove last position from locationTrail.", () => {
    const locationTrail = [2,3];
    const expected = [2];
    const actual = traverseUp(locationTrail);
    assert.sameOrderedMembers(actual, expected);
  });
  it("Throws exception when passed locationTrail is empty.", () => {
    const locationTrail = [];
    const fn = () => traverseUp(locationTrail);
    assert.throws(fn, /locationTrail is empty/);
  });
});
