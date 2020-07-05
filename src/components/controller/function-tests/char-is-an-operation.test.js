import { expect } from "chai";
import { OPERATIONS } from "../../../consts";
import { charIsAnOperation } from "../functions";

describe("charIsAnOperation function", () => {
  it("Returns true when passed ADDITION_CHAR const.", () => {
    const expected = true;
    const actual = charIsAnOperation(OPERATIONS.ADDITION_CHAR);
    expect(actual).to.equal(expected);
  });
  it("Returns true when passed SUBTRACTION_CHAR const.", () => {
    const expected = true;
    const actual = charIsAnOperation(OPERATIONS.SUBTRACTION_CHAR);
    expect(actual).to.equal(expected);
  });
  it("Returns true when passed MULTIPLICATION_CHAR const.", () => {
    const expected = true;
    const actual = charIsAnOperation(OPERATIONS.MULTIPLICATION_CHAR);
    expect(actual).to.equal(expected);
  });
  it("Returns true when passed DIVISION_CHAR const.", () => {
    const expected = true;
    const actual = charIsAnOperation(OPERATIONS.DIVISION_CHAR);
    expect(actual).to.equal(expected);
  });
  it("Returns true when passed POTENCY_CHAR const.", () => {
    const expected = true;
    const actual = charIsAnOperation(OPERATIONS.POTENCY_CHAR);
    expect(actual).to.equal(expected);
  });
  it("Returns false when passed a regular integer.", () => {
    const expected = false;
    const actual = charIsAnOperation(1);
    expect(actual).to.equal(expected);
  });
  it("Returns false when passed a regular char.", () => {
    const expected = false;
    const actual = charIsAnOperation("c");
    expect(actual).to.equal(expected);
  });
  it("Returns false when passed a boolean.", () => {
    const expected = false;
    const actual = charIsAnOperation(true);
    expect(actual).to.equal(expected);
  });
  it("Returns false when passed null.", () => {
    const expected = false;
    const actual = charIsAnOperation(null);
    expect(actual).to.equal(expected);
  });
  it("Returns false when passed nothing.", () => {
    const expected = false;
    const actual = charIsAnOperation();
    expect(actual).to.equal(expected);
  });
});
