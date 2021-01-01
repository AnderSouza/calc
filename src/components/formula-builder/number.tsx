import { ElementTypes } from "../../consts";
import { Element } from "./element";

export class Number implements Element {
  value: number;
  type: ElementTypes;

  constructor(value: number) {
    this.value = value;
    this.type = ElementTypes.NUMBER;
  }

  evaluate() {
    return this.value;
  }
}
