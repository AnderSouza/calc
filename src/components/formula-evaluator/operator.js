import { ELEMENT_TYPES } from "../../consts";
import { CalcException } from "../../exceptions";

export default class Operator {
  constructor(value) {
    this.value = value;
    this.type = ELEMENT_TYPES.OPERATION;
  }

  evaluate() {
    throw new CalcException("Trying to evaluate an operator.");
  }
}
