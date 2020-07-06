import { ELEMENT_TYPES } from "../../../consts";
import { CalcException } from "./../../../exceptions";

class FormulaOperator {
  constructor(value) {
    this.value = value;
    this.type = ELEMENT_TYPES.OPERATION;
  }

  evaluate() {
    throw new CalcException("Trying to evaluate an operator.");
  }
}

export default FormulaOperator;
