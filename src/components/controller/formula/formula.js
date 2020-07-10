import _ from "lodash";
import { ELEMENT_TYPES } from "../../../consts";
import OPERATIONS from "../../../consts/operations";
import FormulaNumber from "./formula-number";
import { elementIsAFormula } from "./functions";
import { CalcException } from "../../../exceptions";

class Formula {
  constructor(value = []) {
    this.value = value;
    this.type = ELEMENT_TYPES.FORMULA;
  }

  // Primary functions
  getElement(position) {
    let foundElement = null;
    this.value.forEach((value, index) => {
      if (position == index) foundElement = value;
    });
    return foundElement;
  }

  addElement(newElement) {
    newElement = _.cloneDeep(newElement);
    this.value.push(newElement);
  }

  replaceElement(newElement, position) {
    newElement = _.cloneDeep(newElement);
    this.value = this.value.map((value, index) => {
      return position === index ? newElement : value;
    });
  }

  removeElement(position) {
    this.value = this.value.filter((value, index) => index !== position);
  }

  getNumberOfElements() {
    return this.value.length;
  }

  // End of the primary functions

  isEmpty() {
    return this.getNumberOfElements() === 0;
  }

  getLastElement() {
    let numberOfElements = this.getNumberOfElements();
    if (numberOfElements === 0) return null;

    const position = numberOfElements - 1;
    return this.getElement(position);
  }

  removeLastElement() {
    let numberOfElements = this.getNumberOfElements();
    if (numberOfElements === 0)
      throw new CalcException(
        "Cannot remove last element because the formula is empty."
      );

    const position = numberOfElements - 1;
    this.removeElement(position);
  }

  replaceLastElement(newElement) {
    let numberOfElements = this.getNumberOfElements();
    if (numberOfElements === 0)
      throw new CalcException(
        "Cannot replace last element because the formula is empty."
      );

    const position = numberOfElements - 1;
    this.replaceElement(position, newElement);
  }

  getElementThroughTrail(locationTrail = []) {
    locationTrail = _.cloneDeep(locationTrail);

    if (locationTrail.length === 0) return this;
    if (this.value.length === 0)
      throw new CalcException("This formula has no elements.");

    let element = this.getElement(locationTrail.shift());
    locationTrail.forEach((position) => {
      element = element.getElement(position);
    });
    return element;
  }

  /* Evaluation start */
  evaluate() {
    if (this.value.length === 0) return 0;

    let elements = _.cloneDeep(this.value);

    elements = this.findAndExecuteAllOperationsOfTypes(
      [OPERATIONS.POTENCY],
      elements
    );
    elements = this.findAndExecuteAllOperationsOfTypes(
      [OPERATIONS.MULTIPLICATION, OPERATIONS.DIVISION],
      elements
    );
    elements = this.findAndExecuteAllOperationsOfTypes(
      [OPERATIONS.ADDITION, OPERATIONS.SUBTRACTION],
      elements
    );
    return elements.pop().evaluate();
  }

  findAndExecuteAllOperationsOfTypes(operationTypes, elements) {
    let operationIndex = undefined;
    let firstNumber = undefined;
    let secondNumber = undefined;
    let operation = undefined;

    for (let i = 0; i < 10; i++) {
      operationIndex = undefined;
      firstNumber = undefined;
      secondNumber = undefined;
      operation = undefined;

      for (let x = 0; x < elements.length; x++) {
        if (
          elements[x].type === ELEMENT_TYPES.OPERATION &&
          operationTypes.includes(elements[x].value)
        ) {
          operation = elements[x];
          operationIndex = x;

          firstNumber = elements[operationIndex - 1];
          secondNumber = elements[operationIndex + 1];
          break;
        }
      }
      if (
        firstNumber !== undefined &&
        secondNumber !== undefined &&
        operation !== undefined
      ) {
        elements[operationIndex - 1] = this.executeOperation(
          operation,
          firstNumber,
          secondNumber
        );
        elements.splice(operationIndex, 2);
      } else if (secondNumber !== undefined && operation !== undefined) {
        if (operation.value === OPERATIONS.ADDITION) {
          let value = secondNumber.evaluate();
          elements[operationIndex] = this.createNumber(value);
        } else if (operation.value === OPERATIONS.SUBTRACTION) {
          let value = secondNumber.evaluate();
          elements[operationIndex] = this.createNumber(-value);
        }
        elements.splice(operationIndex + 1, 1);
      } else if (firstNumber !== undefined && operation !== undefined) {
        elements[operationIndex - 1] = firstNumber;
        elements.splice(operationIndex, 1);
      } else {
        break;
      }
    }

    return elements;
  }

  executeOperation(operation, firstNumber, secondNumber) {
    let result;
    switch (operation.value) {
      case OPERATIONS.POTENCY:
        result = this.evaluatePotency(firstNumber, secondNumber);
        return this.createNumber(result.toFixed(2));
      case OPERATIONS.MULTIPLICATION:
        result = this.evaluateMultiplication(firstNumber, secondNumber);
        return this.createNumber(result.toFixed(2));
      case OPERATIONS.DIVISION:
        result = this.evaluateDivision(firstNumber, secondNumber);
        return this.createNumber(result.toFixed(2));
      case OPERATIONS.ADDITION:
        console.log("firstNumber", firstNumber);
        console.log("secondNumber", secondNumber);
        result = this.evaluateAddition(firstNumber, secondNumber);
        console.log(result);
        return this.createNumber(result.toFixed(2));
      case OPERATIONS.SUBTRACTION:
        result = this.evaluateSubtraction(firstNumber, secondNumber);
        return this.createNumber(result.toFixed(2));
      default:
        throw new CalcException("Unknown operation.");
    }
  }

  evaluatePotency(firstNumber, secondNumber) {
    firstNumber =
      elementIsAFormula(firstNumber) && firstNumber.isEmpty()
        ? 1
        : firstNumber.evaluate();

    secondNumber =
      elementIsAFormula(secondNumber) && secondNumber.isEmpty()
        ? 1
        : secondNumber.evaluate();

    return Math.pow(firstNumber, secondNumber);
  }

  evaluateMultiplication(firstNumber, secondNumber) {
    firstNumber =
      elementIsAFormula(firstNumber) && firstNumber.isEmpty()
        ? 1
        : firstNumber.evaluate();

    secondNumber =
      elementIsAFormula(secondNumber) && secondNumber.isEmpty()
        ? 1
        : secondNumber.evaluate();

    return firstNumber * secondNumber;
  }

  evaluateDivision(firstNumber, secondNumber) {
    firstNumber =
      elementIsAFormula(firstNumber) && firstNumber.isEmpty()
        ? 1
        : firstNumber.evaluate();

    secondNumber =
      elementIsAFormula(secondNumber) && secondNumber.isEmpty()
        ? 1
        : secondNumber.evaluate();

    return firstNumber / secondNumber;
  }

  evaluateAddition(firstNumber, secondNumber) {
    firstNumber =
      elementIsAFormula(firstNumber) && firstNumber.isEmpty()
        ? 0
        : firstNumber.evaluate();

    secondNumber =
      elementIsAFormula(secondNumber) && secondNumber.isEmpty()
        ? 0
        : secondNumber.evaluate();

    return firstNumber + secondNumber;
  }

  evaluateSubtraction(firstNumber, secondNumber) {
    firstNumber =
      elementIsAFormula(firstNumber) && firstNumber.isEmpty()
        ? 0
        : firstNumber.evaluate();

    secondNumber =
      elementIsAFormula(secondNumber) && secondNumber.isEmpty()
        ? 0
        : secondNumber.evaluate();

    return firstNumber - secondNumber;
  }

  thereAreRemainingOperationsOfTypes(operationTypes, array) {
    let found = false;
    operationTypes.forEach((type) => {
      if (this.thereAreRemainingOperationsOfType(type, array)) found = true;
    });
    return found;
  }

  thereAreRemainingOperationsOfType(operationType, array) {
    let found = false;
    array.forEach((element) => {
      if (element.value === operationType) found = true;
    });
    return found;
  }

  createNumber(number) {
    return new FormulaNumber(number);
  }

  isFormulaE;
}

export default Formula;
