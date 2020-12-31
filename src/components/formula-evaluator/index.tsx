import Formula from "./formula";
import {
  traverseDown,
  traverseUp,
  processNumber,
  processOperation,
  createNestedFormula,
} from "./index.func";
import { EVENT_KEYS } from "../../consts/index";
import { CalcException } from "../../exceptions/index";

export default (text) => {
  let formulaArray = text.split("");
  let formula = new Formula();
  let trail = [];

  const processChar = (char) => {
    switch (char) {
      case EVENT_KEYS.ZERO:
      case EVENT_KEYS.ONE:
      case EVENT_KEYS.TWO:
      case EVENT_KEYS.THREE:
      case EVENT_KEYS.FOUR:
      case EVENT_KEYS.FIVE:
      case EVENT_KEYS.SIX:
      case EVENT_KEYS.SEVEN:
      case EVENT_KEYS.EIGHT:
      case EVENT_KEYS.NINE:
      case EVENT_KEYS.POINT:
        formula = processNumber(char, formula, trail);
        break;
      case EVENT_KEYS.ADDITION:
      case EVENT_KEYS.SUBTRACTION:
      case EVENT_KEYS.MULTIPLICATION:
      case EVENT_KEYS.DIVISION:
      case EVENT_KEYS.POTENCY:
        formula = processOperation(char, formula, trail);
        break;
      case EVENT_KEYS.OPENING_PARENTHESIS:
        trail = traverseDown(trail, formula);
        formula = createNestedFormula(formula, trail);
        break;
      case EVENT_KEYS.CLOSING_PARENTHESIS:
        trail = traverseUp(trail);
        break;
      default:
        throw new CalcException(`Unknown character: ${char}`);
    }
  };

  formulaArray.forEach(processChar);
  return formula;
};
