import {assert} from "chai";
import {createFormulaOperator} from "../../functions";
import FormulaOperator from "../../formula-operator";
import {CODE_TYPES, OPERATIONS} from "../../../../../consts";

describe("createFormulaOperator function", () => {
    it("Returns instanceof FormulaOperator.", () => {
        const actual = createFormulaOperator(OPERATIONS.ADDITION);
        assert.instanceOf(actual, FormulaOperator);
    });
    it("Returns a instance of FormulaOperator with value set to ADDITION.", () => {
        const expected = OPERATIONS.ADDITION;
        const actual = createFormulaOperator(OPERATIONS.ADDITION).value;
        assert.equal(actual, expected);
    });
    it("Returns a instance of FormulaOperator with type set to OPERATION.", () => {
        const expected = CODE_TYPES.OPERATION;
        const actual = createFormulaOperator(OPERATIONS.ADDITION).type;
        assert.equal(actual, expected);
    });
});