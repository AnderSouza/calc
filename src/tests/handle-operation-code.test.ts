import { handleOperationCode } from "../components/formula-text-handler/index.func";
import { Buttons, EventKeys } from "../consts";

describe("handleOperationCode", () => {
  it.each([
    ["multiplication", Buttons.MULTIPLICATION, EventKeys.MULTIPLICATION],
    ["division", Buttons.DIVISION, EventKeys.DIVISION],
    ["subtraction", Buttons.SUBTRACTION, EventKeys.SUBTRACTION],
    ["addition", Buttons.ADDITION, EventKeys.ADDITION],
    ["potency", Buttons.POTENCY, EventKeys.POTENCY],
  ])("Adds %s to the string.", (name, code, char) => {
    const expected = `25${char}`;
    const actual = handleOperationCode(code, "25");
    expect(actual).toBe(expected);
  });
  it.each([
    ["multiplication", Buttons.MULTIPLICATION, EventKeys.MULTIPLICATION],
    ["division", Buttons.DIVISION, EventKeys.DIVISION],
    ["subtraction", Buttons.SUBTRACTION, EventKeys.SUBTRACTION],
    ["addition", Buttons.ADDITION, EventKeys.ADDITION],
    ["potency", Buttons.POTENCY, EventKeys.POTENCY],
  ])("Adds an OPENING_PARENTHESIS after a %s.", (name, code, key) => {
    const expected = `25${key}(`;
    const actual = handleOperationCode(Buttons.OPENING_PARENTHESIS, `25${key}`);
    expect(actual).toBe(expected);
  });

  it.each([
    ["zero", Buttons.ZERO, EventKeys.ZERO],
    ["one", Buttons.ONE, EventKeys.ONE],
    ["two", Buttons.TWO, EventKeys.TWO],
    ["three", Buttons.THREE, EventKeys.THREE],
    ["four", Buttons.FOUR, EventKeys.FOUR],
    ["five", Buttons.FIVE, EventKeys.FIVE],
    ["six", Buttons.SIX, EventKeys.SIX],
    ["seven", Buttons.SEVEN, EventKeys.SEVEN],
    ["eight", Buttons.EIGHT, EventKeys.EIGHT],
    ["nine", Buttons.NINE, EventKeys.NINE],
  ])("Adds a CLOSING_PARENTHESIS after a %s.", (name, code, char) => {
    const expected = `25+(2x${char})`;
    const actual = handleOperationCode(
      Buttons.CLOSING_PARENTHESIS,
      `25+(2x${char}`
    );
    expect(actual).toBe(expected);
  });

  it.each([
    ["multiplication", Buttons.MULTIPLICATION, EventKeys.MULTIPLICATION],
    ["division", Buttons.DIVISION, EventKeys.DIVISION],
    ["subtraction", Buttons.SUBTRACTION, EventKeys.SUBTRACTION],
    ["potency", Buttons.POTENCY, EventKeys.POTENCY],
  ])("replaces an addition with a %s.", (name, code, char) => {
    const expected = `25+(2x3)${char}`;
    const actual = handleOperationCode(code, "25+(2x3)+");
    expect(actual).toBe(expected);
  });

  it.each([
    ["multiplication", Buttons.MULTIPLICATION],
    ["division", Buttons.DIVISION],
    ["potency", Buttons.POTENCY],
  ])(
    "throws an exception when trying to add a %s to an empty string.",
    (name, code) => {
      const fn = () => handleOperationCode(code, "");
      expect(fn).toThrowError(/Cannot insert this operation at this position/);
    }
  );

  it.each([
    ["multiplication", Buttons.MULTIPLICATION],
    ["division", Buttons.DIVISION],
    ["potency", Buttons.POTENCY],
  ])(
    "throws an exception when trying to add a %s to a string ending in an opening parenthesis.",
    (name, code) => {
      const fn = () => handleOperationCode(code, "25+(");
      expect(fn).toThrowError(/Cannot insert this operation at this position/);
    }
  );

  it("throws an exception when trying to replace an addition with a multiplication right after an opening parenthesis.", () => {
    const fn = () => handleOperationCode(Buttons.MULTIPLICATION, "25/(+");
    expect(fn).toThrowError(/Cannot insert this operation at this position/);
  });

  it("throws an exception when trying to add an opening parenthesis to an empty string.", () => {
    const fn = () => handleOperationCode(Buttons.OPENING_PARENTHESIS, "");
    expect(fn).toThrowError(
      /Cannot insert an opening parenthesis at this position/
    );
  });

  it("throws an exception when trying to add an opening parenthesis after a number.", () => {
    const fn = () => handleOperationCode(Buttons.OPENING_PARENTHESIS, "2+5");
    expect(fn).toThrowError(
      /Cannot insert an opening parenthesis at this position/
    );
  });

  it("throws an exception when trying to add an opening parenthesis after an opening parenthesis.", () => {
    const fn = () => handleOperationCode(Buttons.OPENING_PARENTHESIS, "3x(");
    expect(fn).toThrowError(
      /Cannot insert an opening parenthesis at this position/
    );
  });

  it("throws an exception when trying to add an opening parenthesis after a closing parenthesis.", () => {
    const fn = () =>
      handleOperationCode(Buttons.OPENING_PARENTHESIS, "3x(5+4)");
    expect(fn).toThrowError(
      /Cannot insert an opening parenthesis at this position/
    );
  });

  it("throws an exception when trying to add a closing parenthesis to an empty string.", () => {
    const fn = () => handleOperationCode(Buttons.CLOSING_PARENTHESIS, "");
    expect(fn).toThrowError(
      /Cannot insert a closing parenthesis at this position/
    );
  });

  it("throws an exception when trying to add a closing parenthesis after an opening parenthesis.", () => {
    const fn = () => handleOperationCode(Buttons.CLOSING_PARENTHESIS, "3x(");
    expect(fn).toThrowError(
      /Cannot insert a closing parenthesis at this position/
    );
  });

  it.each([
    [
      ["zero", Buttons.ZERO],
      ["one", Buttons.ONE],
      ["two", Buttons.TWO],
      ["three", Buttons.THREE],
      ["four", Buttons.FOUR],
      ["five", Buttons.FIVE],
      ["six", Buttons.SIX],
      ["seven", Buttons.SEVEN],
      ["eight", Buttons.EIGHT],
      ["nine", Buttons.NINE],
      ["point", Buttons.POINT],
    ],
  ])("throws an exception when passed a %s to the function.", (code) => {
    const fn = () => handleOperationCode(Buttons.ONE, "");
    expect(fn).toThrowError(/Unknown operation code/);
  });
});
