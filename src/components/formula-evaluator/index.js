import Formula from "./formula";
import {
  traverseDown,
  traverseDown,
  processNumber,
  processOperation,
  createNestedFormula,
} from "./functions.index";
import { EVENT_KEYS } from "../../../consts";
import { CalcException } from "../../../exceptions/index";

export default FormulaEvaluator = (text) => {
  let formulaArray = text.split("");
  let formula = new Formula();
  let locationTrail = [];

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
        formula = processNumber(char, formula, locationTrail);
        break;
      case EVENT_KEYS.ADDITION:
      case EVENT_KEYS.SUBTRACTION:
      case EVENT_KEYS.MULTIPLICATION:
      case EVENT_KEYS.DIVISION:
      case EVENT_KEYS.POTENCY:
        formula = processOperation(char, formula, locationTrail);
        break;
      case EVENT_KEYS.OPENING_PARENTHESIS:
        locationTrail = traverseDown(locationTrail, formula);
        formula = createNestedFormula(formula, locationTrail);
        break;
      case EVENT_KEYS.CLOSING_PARENTHESIS:
        locationTrail = traverseDown(locationTrail);
        break;
      default:
        throw new CalcException("Unknown character.");
    }
  };

  formulaArray.forEach(processChar);
  return formula;
};
