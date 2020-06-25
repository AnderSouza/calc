import _, { first } from "lodash";
import ELEMENT_TYPES from "./../../const/element-types";
import OPERATIONS from "./../../const/operations";

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

  // 1º Potências e raízes
  // 2º Multiplicações e divisões
  // 3º Adições e subtrações
  evaluate = () => {
    let result = 0;

    let elementsCopy = _.cloneDeep(this.elements);

    elementsCopy.map(this.evaluatePotency);
    elementsCopy.map(this.evaluateMultiplicationAndDivision);
    elementsCopy.map(this.evaluateAdditionAndSubtraction);

    return result;
  };

  evaluatePotency = (element, index, array) => {
    if (index === 0) {
      return element;
    } else if (
      element.type === ELEMENT_TYPES.OPERATION &&
      element.type === OPERATIONS.POTENCY
    ) {
      let firstNumber = array[index - 1];
      let secondNumber = array[index + 1];
      let result = executeMathematicalOperation(
        firstNumber,
        secondNumber,
        OPERATIONS.POTENCY
      );
      array[index - 1] = result;
      array.splice(index, 2);
    }
  };

  // Continuar do evaluatePotency
  evaluatePotency = (element, index, array) => {
    if (index === 0) {
      return element;
    } else if (
      element.type === ELEMENT_TYPES.OPERATION &&
      element.type === OPERATIONS.POTENCY
    ) {
      let firstNumber = array[index - 1];
      let secondNumber = array[index + 1];
      let result = executeMathematicalOperation(
        firstNumber,
        secondNumber,
        OPERATIONS.POTENCY
      );
      array[index - 1] = result;
      array.splice(index, 2);
    }
  };

  executeMathematicalOperation = (firstElement, secondElement, operation) => {
    switch (operation) {
      case OPERATIONS.ADDITION:
        return firstElement + secondElement;
      case OPERATIONS.SUBTRACTION:
        return firstElement - secondElement;
      case OPERATIONS.MULTIPLICATION:
        return firstElement * secondElement;
      case OPERATIONS.DIVISION:
        return firstElement / secondElement;
      case OPERATIONS.POTENCY:
        return Math.pow(firstElement, secondElement);
    }
  };

  evaluateMultiplicationAndDivision = (element, index, array) => {
    if (element.type == ELEMENT_TYPES.OPERATION) {
      switch (element.value) {
        case OPERATIONS.MULTIPLICATION:
          break;
        case OPERATIONS.DIVISION:
          break;
      }
    }
  };

  evaluateAdditionAndSubtraction = (element, index, array) => {
    if (element.type == ELEMENT_TYPES.OPERATION) {
      switch (element.value) {
        case OPERATIONS.ADDITION:
          break;
        case OPERATIONS.SUBTRACTION:
          break;
      }
    }
  };
}

export default Formula;
