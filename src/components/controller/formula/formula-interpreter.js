import Formula from "./formula";
import {
  transformStringIntoArray,
  goDownOnLocationTrail,
  goUpOnLocationTrail,
  processNumber,
  processOperation,
  createNestedFormulaThroughLocationTrail
} from "./functions";
import { NUMBERS, OPERATIONS } from "./../../../consts";
import {CalcException} from "./../../../exceptions/index";

const FormulaInterpreter = (formulaText) => {
  let arrayOfFormulaCharacters = transformStringIntoArray(formulaText);
  let formula = new Formula();
  let locationTrail = [];

  const processCharacter = (char) => {
    switch (char) {
      case NUMBERS.ZERO_CHAR:
      case NUMBERS.ONE_CHAR:
      case NUMBERS.TWO_CHAR:
      case NUMBERS.THREE_CHAR:
      case NUMBERS.FOUR_CHAR:
      case NUMBERS.FIVE_CHAR:
      case NUMBERS.SIX_CHAR:
      case NUMBERS.SEVEN_CHAR:
      case NUMBERS.EIGHT_CHAR:
      case NUMBERS.NINE_CHAR:
      case NUMBERS.POINT_CHAR:
        formula = processNumber(char, formula, locationTrail);
        break;
      case OPERATIONS.ADDITION_CHAR:
      case OPERATIONS.SUBTRACTION_CHAR:
      case OPERATIONS.MULTIPLICATION_CHAR:
      case OPERATIONS.DIVISION_CHAR:
      case OPERATIONS.POTENCY_CHAR:
        formula = processOperation(char, formula, locationTrail);
        break;
      case OPERATIONS.OPENING_PARENTHESIS_CHAR:
        locationTrail = goDownOnLocationTrail(locationTrail, formula);
        formula = createNestedFormulaThroughLocationTrail(formula, locationTrail);
        break;
      case OPERATIONS.CLOSING_PARENTHESIS_CHAR:
        locationTrail = goUpOnLocationTrail(locationTrail);
        break;
      default:
        throw new CalcException("Unknown character.");
    }
  };

  arrayOfFormulaCharacters.forEach(processCharacter);

  return formula;
};

export default FormulaInterpreter;
