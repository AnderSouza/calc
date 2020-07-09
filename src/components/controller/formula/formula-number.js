import { ELEMENT_TYPES } from "../../../consts";

class FormulaNumber {
  constructor(value) {
    this.value = value;
    this.type = ELEMENT_TYPES.NUMBER;
  }

  evaluate() {
    return parseFloat(this.value);
  }
}

export default FormulaNumber;
