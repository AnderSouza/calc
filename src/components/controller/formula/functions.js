import { ELEMENT_TYPES, NUMBERS, OPERATIONS } from "./../../../consts";
import FormulaNumber from "./formula-number";
import FormulaOperator from "./formula-operator";
import { numericStringAlreadyHasAPoint } from "./../functions";
import CalcException from "./../../../exceptions";

export const transformStringIntoArray = (string) => string.split("");

export const createFormulaNumber = (number) => new FormulaNumber(number);

export const createFormulaOperator = (operator) =>
  new FormulaOperator(operator);

export const charIsPoint = (char) => char === NUMBERS.POINT_CHAR;

export const numericStringIsEmpty = (number) => number === "";

export const goDownOnLocationTrail = (locationTrail, formula) => {
  locationTrail = _.cloneDeep(locationTrail);
  const element = formula.getElementThroughTrail(locationTrail);
  const position = element.getNumberOfElements();
  locationTrail.push(position);
  return locationTrail;
};

export const goUpOnLocationTrail = (locationTrail) => {
  locationTrail = _.cloneDeep(locationTrail);
  locationTrail.pop();
  return locationTrail;
};

export const processNumber = (char, formula, locationTrail) => {
  let lastElement = formula.getLastElement();
  if (charIsPoint(char) && numericStringAlreadyHasAPoint(lastElement.value)) {
    throw new CalcException(
      "Cannot insert point because the number already has it."
    );
  } else if (lastElement.type === ELEMENT_TYPES.NUMBER) {
    lastElement.value = lastElement.value.concat(char);
    formula.replaceLastElement(lastElement);
  } else {
    const number = createFormulaNumber(char);
    formula.addElement(number, locationTrail);
  }
  return formula;
};

export const processOperation = (char, formula, locationTrail) => {
  const code = OPERATIONS.getOperationCodeFromChar(char);
  const formulaOperator = createFormulaOperator(code);
  formula.addElement(formulaOperator, locationTrail);
  return formula;
};
