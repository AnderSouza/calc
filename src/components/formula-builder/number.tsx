import { ElementTypes } from "../../consts";
import { Element } from "./element";

export class Number implements Element {
  value: string;
  type: ElementTypes;

  constructor(value: string) {
    this.value = value;
    this.type = ElementTypes.NUMBER;
  }

  evaluate() {
    return +this.value;
  }
}
