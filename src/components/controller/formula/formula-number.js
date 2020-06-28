import ELEMENT_TYPES from "./../../../const/element-types";

class FormulaNumber {
    constructor(value) {
        this.value = value;
        this.type = ELEMENT_TYPES.NUMBER;
    }

    evaluate = () => {
        return this.value;
    }
}

export default FormulaNumber;