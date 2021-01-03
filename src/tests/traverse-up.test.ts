import { traverseUp } from "../components/formula-builder/index.func";

describe("traverseUp function", () => {
  it("Remove last position from trail.", () => {
    const trail = [2, 3];
    const expected = [2];
    const actual = traverseUp(trail);
    expect(actual).toEqual(expected);
  });
  it("Throws exception when passed trail is empty.", () => {
    const trail: number[] = [];
    const fn = () => traverseUp(trail);
    expect(fn).toThrowError(/trail is empty/);
  });
});
