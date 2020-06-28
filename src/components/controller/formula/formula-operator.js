import ELEMENT_TYPES from "../../../consts/code-types";

class FormulaOperator {
    constructor(value) {
        this.value = value;
        this.type = ELEMENT_TYPES.OPERATION;
    }

    evaluate = () => {
        // You should throw an exception here.
    }
}

export default FormulaOperator;