import { ELEMENT_TYPES } from "../../consts";

export default class Number {
  constructor(value) {
    this.value = value;
    this.type = ELEMENT_TYPES.NUMBER;
  }

  evaluate() {
    return parseFloat(this.value);
  }
}
