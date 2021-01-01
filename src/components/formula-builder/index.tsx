import { Formula } from "./formula";
import {
  traverseDown,
  traverseUp,
  processNumber,
  processOperation,
  createNestedFormula,
} from "./index.func";
import { EventKeys } from "../../consts/index";
import { CalcException } from "../../exceptions/index";

export default (text: string) => {
  let formulaArray = text.split("");
  let formula = new Formula();
  let trail: number[] = [];
  const processChar = (char: string) => {
    switch (char) {
      case EventKeys.ZERO:
      case EventKeys.ONE:
      case EventKeys.TWO:
      case EventKeys.THREE:
      case EventKeys.FOUR:
      case EventKeys.FIVE:
      case EventKeys.SIX:
      case EventKeys.SEVEN:
      case EventKeys.EIGHT:
      case EventKeys.NINE:
      case EventKeys.POINT:
        formula = processNumber(char, formula, trail);
        break;
      case EventKeys.ADDITION:
      case EventKeys.SUBTRACTION:
      case EventKeys.MULTIPLICATION:
      case EventKeys.DIVISION:
      case EventKeys.POTENCY:
        formula = processOperation(char, formula, trail);
        break;
      case EventKeys.OPENING_PARENTHESIS:
        trail = traverseDown(trail, formula);
        formula = createNestedFormula(formula, trail);
        break;
      case EventKeys.CLOSING_PARENTHESIS:
        trail = traverseUp(trail);
        break;
      default:
        throw new CalcException(`Unknown character: ${char}`);
    }
  };

  formulaArray.forEach(processChar);
  return formula;
};
