import { ElementTypes } from "../../consts";

export interface Element {
  type: ElementTypes;
  evaluate: () => number;
}
