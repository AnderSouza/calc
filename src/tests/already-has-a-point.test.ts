import { alreadyHasAPoint } from "../components/formula-text-handler/index.func";

describe("alreadyHasAPoint", () => {
  it("returns true when passed a number with one point in the middle.", () => {
    const expected = true;
    const actual = alreadyHasAPoint("8.25");
    expect(actual).toBe(expected);
  });
  it("returns true when passed a number with one point in the end.", () => {
    const expected = true;
    const actual = alreadyHasAPoint("913.");
    expect(actual).toBe(expected);
  });
  it("returns true when passed a number with one point in the beginning.", () => {
    const expected = true;
    const actual = alreadyHasAPoint(".436");
    expect(actual).toBe(expected);
  });
  it("returns false when passed a number with no points at all", () => {
    const expected = false;
    const actual = alreadyHasAPoint("6821");
    expect(actual).toBe(expected);
  });
});
