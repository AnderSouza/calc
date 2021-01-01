import { handleOperationCode } from "../src/components/formula-text-handler/index.func";
import { BUTTONS, EVENT_KEYS } from "../src/consts";

describe("handleOperationCode", () => {
  it.each([
    ["multiplication", BUTTONS.MULTIPLICATION, EVENT_KEYS.MULTIPLICATION],
    ["division", BUTTONS.DIVISION, EVENT_KEYS.DIVISION],
    ["subtraction", BUTTONS.SUBTRACTION, EVENT_KEYS.SUBTRACTION],
    ["addition", BUTTONS.ADDITION, EVENT_KEYS.ADDITION],
    ["potency", BUTTONS.POTENCY, EVENT_KEYS.POTENCY],
  ])("Adds %s to the string.", (name, code, char) => {
    const expected = `25${char}`;
    const actual = handleOperationCode(code, "25");
    expect(actual).toBe(expected);
  });
  it.each([
    ["multiplication", BUTTONS.MULTIPLICATION, EVENT_KEYS.MULTIPLICATION],
    ["division", BUTTONS.DIVISION, EVENT_KEYS.DIVISION],
    ["subtraction", BUTTONS.SUBTRACTION, EVENT_KEYS.SUBTRACTION],
    ["addition", BUTTONS.ADDITION, EVENT_KEYS.ADDITION],
    ["potency", BUTTONS.POTENCY, EVENT_KEYS.POTENCY],
  ])("Adds an OPENING_PARENTHESIS after a %s.", (name, code, key) => {
    const expected = `25${key}(`;
    const actual = handleOperationCode(BUTTONS.OPENING_PARENTHESIS, `25${key}`);
    expect(actual).toBe(expected);
  });

  it.each([
    ["zero", BUTTONS.ZERO, EVENT_KEYS.ZERO],
    ["one", BUTTONS.ONE, , EVENT_KEYS.ONE],
    ["two", BUTTONS.TWO, EVENT_KEYS.TWO],
    ["three", BUTTONS.THREE, EVENT_KEYS.THREE],
    ["four", BUTTONS.FOUR, EVENT_KEYS.FOUR],
    ["five", BUTTONS.FIVE, EVENT_KEYS.FIVE],
    ["six", BUTTONS.SIX, EVENT_KEYS.SIX],
    ["seven", BUTTONS.SEVEN, EVENT_KEYS.SEVEN],
    ["eight", BUTTONS.EIGHT, EVENT_KEYS.EIGHT],
    ["nine", BUTTONS.NINE, EVENT_KEYS.NINE],
  ])("Adds a CLOSING_PARENTHESIS after a %s.", (name, code, char) => {
    const expected = `25+(2x${char})`;
    const actual = handleOperationCode(
      BUTTONS.CLOSING_PARENTHESIS,
      `25+(2x${char}`
    );
    expect(actual).toBe(expected);
  });

  it.each([
    ["multiplication", BUTTONS.MULTIPLICATION, EVENT_KEYS.MULTIPLICATION],
    ["division", BUTTONS.DIVISION, EVENT_KEYS.DIVISION],
    ["subtraction", BUTTONS.SUBTRACTION, EVENT_KEYS.SUBTRACTION],
    ["potency", BUTTONS.POTENCY, EVENT_KEYS.POTENCY],
  ])("replaces an addition with a %s.", (name, code, char) => {
    const expected = `25+(2x3)${char}`;
    const actual = handleOperationCode(code, "25+(2x3)+");
    expect(actual).toBe(expected);
  });

  it.each([
    ["multiplication", BUTTONS.MULTIPLICATION],
    ["division", BUTTONS.DIVISION],
    ["potency", BUTTONS.POTENCY],
  ])(
    "throws an exception when trying to add a %s to an empty string.",
    (name, code) => {
      const fn = () => handleOperationCode(code, "");
      expect(fn).toThrowError(/Cannot insert this operation at this position/);
    }
  );

  it.each([
    ["multiplication", BUTTONS.MULTIPLICATION],
    ["division", BUTTONS.DIVISION],
    ["potency", BUTTONS.POTENCY],
  ])(
    "throws an exception when trying to add a %s to a string ending in an opening parenthesis.",
    (name, code) => {
      const fn = () => handleOperationCode(code, "25+(");
      expect(fn).toThrowError(/Cannot insert this operation at this position/);
    }
  );

  it("throws an exception when trying to replace an addition with a multiplication right after an opening parenthesis.", () => {
    const fn = () => handleOperationCode(BUTTONS.MULTIPLICATION, "25/(+");
    expect(fn).toThrowError(/Cannot insert this operation at this position/);
  });

  it("throws an exception when trying to add an opening parenthesis to an empty string.", () => {
    const fn = () => handleOperationCode(BUTTONS.OPENING_PARENTHESIS, "");
    expect(fn).toThrowError(
      /Cannot insert an opening parenthesis at this position/
    );
  });

  it("throws an exception when trying to add an opening parenthesis after a number.", () => {
    const fn = () => handleOperationCode(BUTTONS.OPENING_PARENTHESIS, "2+5");
    expect(fn).toThrowError(
      /Cannot insert an opening parenthesis at this position/
    );
  });

  it("throws an exception when trying to add an opening parenthesis after an opening parenthesis.", () => {
    const fn = () => handleOperationCode(BUTTONS.OPENING_PARENTHESIS, "3x(");
    expect(fn).toThrowError(
      /Cannot insert an opening parenthesis at this position/
    );
  });

  it("throws an exception when trying to add an opening parenthesis after a closing parenthesis.", () => {
    const fn = () =>
      handleOperationCode(BUTTONS.OPENING_PARENTHESIS, "3x(5+4)");
    expect(fn).toThrowError(
      /Cannot insert an opening parenthesis at this position/
    );
  });

  it("throws an exception when trying to add a closing parenthesis to an empty string.", () => {
    const fn = () => handleOperationCode(BUTTONS.CLOSING_PARENTHESIS, "");
    expect(fn).toThrowError(
      /Cannot insert a closing parenthesis at this position/
    );
  });

  it("throws an exception when trying to add a closing parenthesis after an opening parenthesis.", () => {
    const fn = () => handleOperationCode(BUTTONS.CLOSING_PARENTHESIS, "3x(");
    expect(fn).toThrowError(
      /Cannot insert a closing parenthesis at this position/
    );
  });

  it.each([
    [
      ["zero", BUTTONS.ZERO],
      ["one", BUTTONS.ONE],
      ["two", BUTTONS.TWO],
      ["three", BUTTONS.THREE],
      ["four", BUTTONS.FOUR],
      ["five", BUTTONS.FIVE],
      ["six", BUTTONS.SIX],
      ["seven", BUTTONS.SEVEN],
      ["eight", BUTTONS.EIGHT],
      ["nine", BUTTONS.NINE],
      ["point", BUTTONS.POINT],
    ],
  ])("throws an exception when passed a %s to the function.", (code) => {
    const fn = () => handleOperationCode(BUTTONS.ONE, "");
    expect(fn).toThrowError(/Unknown operation code/);
  });
});
