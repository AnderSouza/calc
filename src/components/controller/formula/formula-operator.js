import ELEMENT_TYPES from "./../../../const/element-types";

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