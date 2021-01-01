import _ from "lodash";
import { ElementTypes, getButtonCodeFromEventKey } from "../../consts";
import { Number } from "./number";
import { Operator } from "./operator";
import { Formula } from "./formula";
import { Element } from "./element";

import {
  alreadyHasAPoint,
  charIsNumber,
  charIsPoint,
  charIsAnOperator,
} from "../formula-text-handler/index.func";
import { CalcException } from "../../exceptions";

export const traverseDown = (trail: number[] = [], formula: Formula) => {
  if (formula.value.length === 0)
    throw new CalcException("The formula has no elements.");

  trail = _.cloneDeep(trail);
  const element = formula.getElement(trail);
  if (isFormula(element)) {
    const position = element.size();
    trail.push(position);
    return trail;
  } else {
    throw new CalcException(
      "The element fetched  through trail is not a formula."
    );
  }
};

export const traverseUp = (trail: number[]) => {
  if (trail.length === 0) throw new CalcException("trail is empty.");
  trail = _.cloneDeep(trail);
  trail.pop();
  return trail;
};

export const processNumber = (
  char: string,
  formula: Formula,
  trail: number[]
) => {
  if (!(charIsNumber(char) || charIsPoint(char))) {
    throw new CalcException("The char is neither a point or a number.");
  }
  let last = formula.getElement(trail);
  if (isFormula(last)) {
    last = last.getLastElement();
    if (isNumber(last)) {
      if (charIsPoint(char) && alreadyHasAPoint(last.value)) {
        throw new CalcException(
          "Cannot insert point because the number already has one."
        );
      }
      last.value = +last.value.toString().concat(char);
    } else {
      if (charIsPoint(char)) {
        throw new CalcException("Cannot start a number with a point.");
      }
      const number = new Number(+char);
      const element = formula.getElement(trail);
      if (isFormula(element)) {
        element.addElement(number);
      } else {
        throw new CalcException(
          `The element fetched through the trail is not a Formula. Trail: ${trail}`
        );
      }
    }
    return formula;
  } else {
    throw new CalcException("The element fetched through trail not a Formula.");
  }
};

export const processOperation = (
  char: string,
  formula: Formula,
  trail: number[]
) => {
  if (!charIsAnOperator(char)) {
    throw new CalcException("The char is not an operation.");
  }

  const code = getButtonCodeFromEventKey(char);
  const operator = new Operator(code);

  const element = formula.getElement(trail);
  if (isFormula(element)) {
    element.addElement(operator);
  } else {
    throw new CalcException(
      `The element fetched through the trail is not a Formula. Trail: ${trail}`
    );
  }
  return formula;
};

export const createNestedFormula = (formula: Formula, trail: number[]) => {
  if (formula.value.length === 0)
    throw new CalcException("The formula has no elements.");

  trail = _.cloneDeep(trail);
  formula = _.cloneDeep(formula);
  trail.pop();
  const element = formula.getElement(trail);
  if (isFormula(element)) {
    element.addElement(new Formula());
    return formula;
  } else {
    throw new CalcException(
      `The element fetched through the trail is not a Formula. Trail: ${trail}`
    );
  }
};

export const isNumber = function (element?: Element): element is Number {
  return !!element && element.type === ElementTypes.NUMBER;
};

export const isOperator = function (element?: Element): element is Operator {
  return !!element && element.type === ElementTypes.OPERATION;
};

export const isFormula = function (element?: Element): element is Formula {
  return !!element && element.type === ElementTypes.FORMULA;
};
