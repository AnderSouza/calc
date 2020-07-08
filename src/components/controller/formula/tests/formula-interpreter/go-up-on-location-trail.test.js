import { assert } from "chai";
import { goUpOnLocationTrail } from "../../functions";

describe("goUpOnLocationTrail function", () => {
  it("Remove last position from locationTrail.", () => {
    const locationTrail = [2,3];
    const expected = [2];
    const actual = goUpOnLocationTrail(locationTrail);
    assert.sameOrderedMembers(actual, expected);
  });
  it("Throws exception when passed locationTrail is empty.", () => {
    const locationTrail = [];
    const fn = () => goUpOnLocationTrail(locationTrail);
    assert.throws(fn, /locationTrail is empty/);
  });
});
