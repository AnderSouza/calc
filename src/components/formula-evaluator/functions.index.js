import _ from "lodash";
import { ELEMENT_TYPES, BUTTONS } from "../../consts";
import Number from "./number";
import Operator from "./operator";
import {
  alreadyHasAPoint,
  isNumber,
  isOperation,
  isPoint,
} from "../formula-text-handler/functions.index";
import { CalcException } from "../../exceptions";
import Formula from "./formula";

export const elementIsAFormula = (element) =>
  element.type === ELEMENT_TYPES.FORMULA;

export const createNumber = (number) => new Number(number);

export const createOperator = (operator) => new Operator(operator);

export const traverseDown = (trail = [], formula) => {
  if (formula.value.length === 0)
    throw new CalcException("The formula has no elements.");

  trail = _.cloneDeep(trail);
  const element = formula.getElement(trail);
  const position = element.getNumberOfElements();
  trail.push(position);
  return trail;
};

export const traverseUp = (trail) => {
  if (trail.length === 0) throw new CalcException("trail is empty.");
  trail = _.cloneDeep(trail);
  trail.pop();
  return trail;
};

export const processNumber = (char, formula, trail) => {
  if (!(isNumber(char) || isPoint(char))) {
    throw new CalcException("The char is neither a point or a number.");
  }
  let last = formula.getElement(trail).getlast();
  if (last && last.type === ELEMENT_TYPES.NUMBER) {
    if (isPoint(char) && alreadyHasAPoint(last.value)) {
      throw new CalcException(
        "Cannot insert point because the number already has one."
      );
    }
    last.value = last.value.concat(char);
    formula.getElement(trail).replaceLastElement(last);
  } else {
    if (isPoint(char)) {
      throw new CalcException("Cannot start a number with a point.");
    }
    const number = createNumber(char);
    formula.getElement(trail).addElement(number);
  }
  return formula;
};

export const processOperation = (char, formula, trail) => {
  if (!isOperation(char)) {
    throw new CalcException("The char is not an operation.");
  }

  const code = BUTTONS.getButtonCodeFromEventKey(char);
  const operator = createOperator(code);

  formula.getElement(trail).addElement(operator);
  return formula;
};

export function getElementByIndex(position) {
  let found = null;
  this.value.forEach((value, index) => {
    if (position === index) found = value;
  });

  return found;
}

export const createNestedFormula = (formula, trail) => {
  if (formula.value.length === 0)
    throw new CalcException("The formula has no elements.");

  trail = _.cloneDeep(trail);
  formula = _.cloneDeep(formula);
  trail.pop();
  const element = formula.getElement(trail);
  element.addElement(new Formula());
  return formula;
};
