import { ElementTypes } from "../../consts";
import { Element } from "./element";

export class Operator implements Element {
  value: number;
  type: ElementTypes;

  constructor(value: number) {
    this.value = value;
    this.type = ElementTypes.OPERATION;
  }

  evaluate() {
    return 0;
  }
}
