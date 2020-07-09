import _ from "lodash";
import { ELEMENT_TYPES, NUMBERS, OPERATIONS } from "./../../../consts";
import FormulaNumber from "./formula-number";
import FormulaOperator from "./formula-operator";
import { numericStringAlreadyHasAPoint, charIsANumber, charIsAnOperation, charIsAPoint } from "./../functions";
import { CalcException } from "./../../../exceptions";
import Formula from "./formula";

export const transformStringIntoArray = (string) => string.split("");

export const createFormulaNumber = (number) => new FormulaNumber(number);

export const createFormulaOperator = (operator) =>
  new FormulaOperator(operator);

export const numericStringIsEmpty = (number) => number === "";

export const goDownOnLocationTrail = (locationTrail = [], formula) => {
  if (formula.value.length === 0)
    throw new CalcException("The formula has no elements.");

  locationTrail = _.cloneDeep(locationTrail);
  const element = formula.getElementThroughTrail(locationTrail);
  const position = element.getNumberOfElements();
  locationTrail.push(position);
  return locationTrail;
};

export const goUpOnLocationTrail = (locationTrail) => {
  if (locationTrail.length === 0)
    throw new CalcException("locationTrail is empty.");
  locationTrail = _.cloneDeep(locationTrail);
  locationTrail.pop();
  return locationTrail;
};

export const processNumber = (char, formula, locationTrail) => {
  if(!(charIsANumber(char) || charIsAPoint(char))) {
    throw new CalcException("The char is neither a point or a number.");
  }
  let lastElement = formula
    .getElementThroughTrail(locationTrail)
    .getLastElement();
  if (lastElement && lastElement.type === ELEMENT_TYPES.NUMBER) {
    if (charIsAPoint(char) && numericStringAlreadyHasAPoint(lastElement.value)) {
      throw new CalcException(
        "Cannot insert point because the number already has one."
      );
    } 
    lastElement.value = lastElement.value.concat(char);
    formula
    .getElementThroughTrail(locationTrail)
    .replaceLastElement(lastElement);
  } else {
    if (charIsAPoint(char)) {
      throw new CalcException(
        "Cannot start a number with a point."
      );
    } 
    const number = createFormulaNumber(char);
    formula.getElementThroughTrail(locationTrail).addElement(number);
  }
  return formula;
};

export const processOperation = (char, formula, locationTrail) => {
  if(!charIsAnOperation(char)) {
    throw new CalcException("The char is not an operation.");
  }
  const code = OPERATIONS.getOperationCodeFromChar(char);
  const formulaOperator = createFormulaOperator(code);

  formula.getElementThroughTrail(locationTrail).addElement(formulaOperator);
  return formula;
};

export function getElement(position) {
  let foundElement = null;
  this.value.forEach((value, index) => {
    if (position === index) foundElement =value;
  });

  return foundElement;
};

export const createNestedFormulaThroughLocationTrail = (formula, locationTrail) => {
  if (formula.value.length === 0)
    throw new CalcException("The formula has no elements.");

  locationTrail = _.cloneDeep(locationTrail);
  formula = _.cloneDeep(formula);
  locationTrail.pop();
  const element = formula.getElementThroughTrail(locationTrail);
  element.addElement(new Formula());
  return formula;
};
