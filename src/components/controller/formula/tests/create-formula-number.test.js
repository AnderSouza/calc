import {assert} from "chai";
import {createFormulaNumber} from "../functions";
import FormulaNumber from "../formula-number";
import {CODE_TYPES} from "./../../../../consts";

describe("createFormulaNumber function", () => {
    it("Returns instanceof FormulaNumber.", () => {
        const actual = createFormulaNumber("150");
        assert.instanceOf(actual, FormulaNumber);
    });
    it("Returns a instance of FormulaNumber with value set to '100'.", () => {
        const expected = "100";
        const actual = createFormulaNumber("100").value;
        assert.equal(actual, expected);
    });
    it("Returns a instance of FormulaNumber with type set to NUMBER.", () => {
        const expected = CODE_TYPES.NUMBER;
        const actual = createFormulaNumber("100").type;
        assert.equal(actual, expected);
    });
});