import Formula from "./formula";
import FormulaNumber from "./formula-number";
import FormulaOperator from "./formula-operator";
import OPERATIONS from "../../../const/operations";
import NUMBER_KEYS from "../../../const/number-keys";

const transformStringIntoArray = (string) => {
  let array = [];
  for (let i = 0; array.length < string.length; i++) {
    array.push(string.charAt(i));
  }
  return array;
};

const createFormulaNumber = (number) => {
  return new FormulaNumber(number);
};

const createFormulaOperator = (number) => {
  return new FormulaOperator(number);
};

const charIsPointSeparator = (char) => char === NUMBER_KEYS.POINT;

const numberIsNotEmpty = (number) => number !== "";

const numberAlreadyHasAPointSeparator = (number) =>
  number.search(NUMBER_KEYS.POINT) !== -1;

export default Interpreter = (formulaText) => {
  let arrayOfFormulaCharacters = transformStringIntoArray(formulaText);
  let formula = new Formula();
  let currentNumber = "";
  let locationTrail = [];

  arrayOfFormulaCharacters.forEach((char) => {
    switch (char) {
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case ".":
        if (
          charIsPointSeparator(char) &&
          numberAlreadyHasAPointSeparator(currentNumber)
        ) {
          return;
        } else {
          currentNumber += char;
        }
        break;
      case "+":
      case "-":
      case "*":
      case "/":
      case "√":
      case "^":
        const code = OPERATIONS.getOperationCodeFromCharacter(char);
        if (numberIsNotEmpty(currentNumber)) {
          const formulaNumber = createFormulaNumber(currentNumber);
          formula.addElement(formulaNumber, locationTrail);
          currentNumber = "";
        }

        const FormulaOperator = createFormulaOperator(code);
        formula.addElement(FormulaOperator, locationTrail);
        break;
      case "(":
        const element = formula.getElementThroughTrail(locationTrail);
        const position = formula.getNumberOfElements();
        locationTrail.push(position);
        break;
      case ")":
        locationTrail.pop();
        break;
    }
  });
  
  return formula;
};
