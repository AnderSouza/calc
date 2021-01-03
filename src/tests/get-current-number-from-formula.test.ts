import { getCurrentNumberFromFormula } from "../components/formula-text-handler/index.func";
import { Buttons, EventKeys } from "../consts/index";

describe("getCurrentNumberFromFormula", () => {
  it("returns the number when passed it", () => {
    const expected = "43";
    const actual = getCurrentNumberFromFormula("43");
    expect(actual).toBe(expected);
  });
  it("returns the proper number when passed a simple sum", () => {
    const expected = "275";
    const actual = getCurrentNumberFromFormula("500+275");
    expect(actual).toBe(expected);
  });
  it.each([
    ["multiplication", Buttons.MULTIPLICATION, EventKeys.MULTIPLICATION],
    ["division", Buttons.DIVISION, EventKeys.DIVISION],
    ["subtraction", Buttons.SUBTRACTION, EventKeys.SUBTRACTION],
    ["addition", Buttons.ADDITION, EventKeys.ADDITION],
    ["potency", Buttons.POTENCY, EventKeys.POTENCY],
  ])(`returns nothing when the last char is %s`, (name, code, key) => {
    const expected = "";
    const actual = getCurrentNumberFromFormula(`315-125${key}`);
    expect(actual).toBe(expected);
  });
  it("returns proper decimal number when passed floating point sum", () => {
    const expected = "10.75";
    const actual = getCurrentNumberFromFormula("19.50+10.75");
    expect(actual).toBe(expected);
  });
});
