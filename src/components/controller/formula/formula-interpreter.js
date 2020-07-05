import Formula from "./formula";
import FormulaNumber from "./formula-number";
import FormulaOperator from "./formula-operator";
import CalcException from "../../../exceptions/calc-exception";
import { OPERATIONS, NUMBERS } from "./../../../consts";

const transformStringIntoArray = (string) => {
  let array = [];
  for (let i = 0; array.length < string.length; i++) {
    array.push(string.charAt(i));
  }
  return array;
};

const createFormulaNumber = (number) => new FormulaNumber(number);

const createFormulaOperator = (number) => new FormulaOperator(number);

const charIsPoint = (char) => char === NUMBERS.POINT_CHAR;

const numberIsNotEmpty = (number) => number !== "";

// REUSE THE FUNCTION FROM THE CONTROLLER
const numericStringAlreadyHasAPoint = (number) =>
  number.search(NUMBERS.POINT_CHAR) !== -1;

const FormulaInterpreter = (formulaText) => {
  let arrayOfFormulaCharacters = transformStringIntoArray(formulaText);
  let formula = new Formula();
  let currentNumber = "";
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
        if (charIsPoint(char) && numericStringAlreadyHasAPoint(currentNumber)) {
          throw new CalcException("Unknown number.");
        }
        currentNumber += char;
        break;
      case OPERATIONS.ADDITION_CHAR:
      case OPERATIONS.SUBTRACTION_CHAR:
      case OPERATIONS.MULTIPLICATION_CHAR:
      case OPERATIONS.DIVISION_CHAR:
      case OPERATIONS.POTENCY_CHAR:
        const code = OPERATIONS.getOperationCodeFromChar(char);
        if (numberIsNotEmpty(currentNumber)) {
          const formulaNumber = createFormulaNumber(currentNumber);
          formula.addElement(formulaNumber, locationTrail);
          currentNumber = "";
        }

        const formulaOperator = createFormulaOperator(code);
        formula.addElement(formulaOperator, locationTrail);
        break;
      case "(":
        const element = formula.getElementThroughTrail(locationTrail);
        const position = element.getNumberOfElements();
        locationTrail.push(position);
        break;
      case ")":
        locationTrail.pop();
        break;
      default:
        throw new CalcException("Unknown character.");
    }
  };

  arrayOfFormulaCharacters.forEach(processCharacter);

  return formula;
};

export default FormulaInterpreter;
