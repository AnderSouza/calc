import _ from "lodash";
import ELEMENT_TYPES from "../../../const/element-types";
import OPERATIONS from "../../../const/operations";

class Formula {
  constructor(elements) {
    this.elements = elements;
  }

  // Primary functions
  getElement = (position) => {
    this.elements.forEach((value, index) => {
      if (position === index) return _.cloneDeep(value);
    });

    return null;
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

  removeElement = (position = 0) => {
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

  // Continue by verifying the validity of the 
  // evaluation logic.
  evaluate = () => {
    let elements = this.elements;
    elements = this.findAndExecuteAllOperationsOfTypes(
      [OPERATIONS.POTENCY],
      this.elements
    );
    elements = this.findAndExecuteAllOperationsOfTypes(
      [OPERATIONS.MULTIPLICATION, OPERATIONS.DIVISION],
      this.elements
    );
    elements = this.findAndExecuteAllOperationsOfTypes(
      [OPERATIONS.ADDITION, OPERATIONS.SUBTRACTION],
      this.elements
    );

    return elements.pop().evaluate();
  };

  findAndExecuteAllOperationsOfTypes = (operationTypes, elements) => {
    elements = _.cloneDeep(elements);

    let operationIndex = null;
    let firstNumber = null;
    let secondNumber = null;
    let operation = null;

    while (thereAreRemainingOperationsOfTypes(operationTypes, elements)) {
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

          // In case these positions don't contain a number,
          // an exception should be thrown.
          firstNumber = elements[operationIndex - 1];
          secondNumber = elements[operationIndex + 1];
          break;
        }
      }

      if (firstNumber !== null && secondNumber !== null && operation !== null) {
        elements[operationIndex - 1] = this.executeOperation(
          operation,
          firstNumber,
          secondNumber
        );
        elements.splice(operationIndex, 2);
      }
    }

    return elements;
  };

  executeOperation = (operation, firstNumber, secondNumber) => {
    switch (operation) {
      case OPERATIONS.POTENCY:
        return this.evaluatePotency(firstNumber, secondNumber);
      case OPERATIONS.MULTIPLICATION:
        return this.evaluateMultiplication(firstNumber, secondNumber);
      case OPERATIONS.DIVISION:
        return this.evaluateDivision(firstNumber, secondNumber);
      case OPERATIONS.ADDITION:
        return this.evaluateAddition(firstNumber, secondNumber);
      case OPERATIONS.SUBTRACTION:
        return this.evaluateSubtraction(firstNumber, secondNumber);
      default:
        break;
    }
  };

  evaluatePotency = (firstNumber, secondNumber) =>
    Math.pow(firstNumber.evaluate(), secondNumber.evaluate());

  evaluateMultiplication = (firstNumber, secondNumber) =>
    firstNumber.evaluate() * secondNumber.evaluate();

  evaluateDivision = () => firstNumber.evaluate() / secondNumber.evaluate();

  evaluateAddition = () => firstNumber.evaluate() + secondNumber.evaluate();

  evaluateSubtraction = () => firstNumber.evaluate() - secondNumber.evaluate();

  thereAreRemainingOperationsOfTypes = (operationTypes, array) => {
    let found = false;
    operationTypes.forEach((type) => {
      if (this.thereAreRemainingOperationsOfType(type, array)) found = true;
    });
    return found;
  };

  thereAreRemainingOperationsOfType = (operationType, array) => {
    let found = false;
    array.forEach((current, index) => {
      if (current.type === operationType) found = true;
    });
    return found;
  };
}

export default Formula;
