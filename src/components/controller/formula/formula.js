import _ from "lodash";
import ELEMENT_TYPES from "../../../consts/code-types";
import OPERATIONS from "../../../consts/operations";
import FormulaNumber from "./formula-number";
import CalcException from "../../../exceptions/calc-exception";

class Formula {
  constructor(elements = []) {
    this.elements = elements;
  }

  // Primary functions
  getElement = (position) => {
    let foundElement = null;
    this.elements.forEach((value, index) => {
      if (position === index) foundElement = _.cloneDeep(value);
    });

    return foundElement;
  };

  addElement = (newElement) => {
    newElement = _.cloneDeep(newElement);
    this.elements.push(newElement);
  };

  replaceElement = (newElement, position) => {
    newElement = _.cloneDeep(newElement);
    this.elements = this.elements.map((value, index) => {
      return position === index ? newElement : value;
    });
  };

  removeElement = (position) => {
    this.elements = this.elements.filter((value, index) => index !== position);
  };

  getNumberOfElements = () => this.elements.length;

  // End of the primary functions

  getPositionOfTheLastElement = () => this.getNumberOfElements() - 1;

  getIsEmpty = () => this.getNumberOfElements() === 0;

  getLastElement = () => {
    const position = this.getPositionOfTheLastElement();
    return this.getElement(position);
  };

  removeLastElement = () => {
    const position = this.getPositionOfTheLastElement();
    this.removeElement(position);
  };

  replaceLastElement = (newElement) => {
    const position = this.getPositionOfTheLastElement();
    this.replaceElement(position, newElement);
  };

  getElementThroughTrail = (locationTrail = []) => {
    let element = this.elements;

    locationTrail.forEach((position) => {
      element = element.getElement(position);
    });

    return element;
  };

  /* Evaluation start */
  evaluate = () => {
    if(this.elements.length === 0) return 0;
    let elements = _.cloneDeep(this.elements);

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
  };

  findAndExecuteAllOperationsOfTypes = (operationTypes, elements) => {
    let operationIndex = null;
    let firstNumber = null;
    let secondNumber = null;
    let operation = null;

    while (this.thereAreRemainingOperationsOfTypes(operationTypes, elements)) {
      operationIndex = null;
      firstNumber = null;
      secondNumber = null;
      operation = null;

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
      }
    }

    return elements;
  };

  executeOperation = (operation, firstNumber, secondNumber) => {
    switch (operation) {
      case OPERATIONS.POTENCY:
        return this.createNumber(
          this.evaluatePotency(firstNumber, secondNumber)
        );
      case OPERATIONS.MULTIPLICATION:
        return this.createNumber(
          this.evaluateMultiplication(firstNumber, secondNumber)
        );
      case OPERATIONS.DIVISION:
        return this.createNumber(
          this.evaluateDivision(firstNumber, secondNumber)
        );
      case OPERATIONS.ADDITION:
        return this.createNumber(
          this.evaluateAddition(firstNumber, secondNumber)
        );
      case OPERATIONS.SUBTRACTION:
        return this.createNumber(
          this.evaluateSubtraction(firstNumber, secondNumber)
        );
      default:
        throw new CalcException("Unknown operation.");
    }
  };

  evaluatePotency = (firstNumber, secondNumber) =>
    Math.pow(firstNumber.evaluate(), secondNumber.evaluate());

  evaluateMultiplication = (firstNumber, secondNumber) =>
    firstNumber.evaluate() * secondNumber.evaluate();

  evaluateDivision = (firstNumber, secondNumber) =>
    firstNumber.evaluate() / secondNumber.evaluate();

  evaluateAddition = (firstNumber, secondNumber) =>
    firstNumber.evaluate() + secondNumber.evaluate();

  evaluateSubtraction = (firstNumber, secondNumber) =>
    firstNumber.evaluate() - secondNumber.evaluate();

  thereAreRemainingOperationsOfTypes = (operationTypes, array) => {
    let found = false;
    operationTypes.forEach((type) => {
      if (this.thereAreRemainingOperationsOfType(type, array)) found = true;
    });
    return found;
  };

  thereAreRemainingOperationsOfType = (operationType, array) => {
    let found = false;
    array.forEach((element) => {
      if (element.type === operationType) found = true;
    });
    return found;
  };

  createNumber = (number) => new FormulaNumber(number);
}

export default Formula;
