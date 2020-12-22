import _ from "lodash";
import { ELEMENT_TYPES } from "../../consts";
import OPERATIONS from "../../../consts/operations";
import Number from "./number";
import { elementIsAFormula } from "./functions.index";
import { CalcException } from "../../exceptions";

export default class Formula {
  constructor(value = []) {
    this.value = value;
    this.type = ELEMENT_TYPES.FORMULA;
  }

  getElementByIndex(index) {
    let found = null;
    this.value.forEach((value, _index) => {
      if (index == _index) found = value;
    });
    return found;
  }

  addElement(element) {
    element = _.cloneDeep(element);
    this.value.push(element);
  }

  replaceElement(newElement, pos) {
    newElement = _.cloneDeep(newElement);
    this.value = this.value.map((value, index) => {
      return pos === index ? newElement : value;
    });
  }

  removeElement(index) {
    this.value = this.value.filter((value, _index) => _index !== index);
  }

  getNumberOfElements() {
    return this.value.length;
  }

  isEmpty() {
    return this.getNumberOfElements() === 0;
  }

  getLastElement() {
    let size = this.getNumberOfElements();
    return size === 0 ? null : this.getElementByIndex(size - 1);
  }

  removeLastElement() {
    let size = this.getNumberOfElements();
    if (size === 0)
      throw new CalcException(
        "Cannot remove last element because the formula is empty."
      );

    this.removeElement(size - 1);
  }

  replaceLastElement(newElement) {
    let size = this.getNumberOfElements();
    if (size === 0)
      throw new CalcException(
        "Cannot replace last element because the formula is empty."
      );
    this.replaceElement(size - 1, newElement);
  }

  getElement(trail = []) {
    trail = _.cloneDeep(trail);

    if (trail.length === 0) return this;
    if (this.value.length === 0)
      throw new CalcException("This formula has no elements.");

    let element = this.getElement(trail.shift());
    trail.forEach((pos) => {
      element = element.getElementByIndex(pos);
    });
    return element;
  }

  evaluate() {
    if (this.value.length === 0) return 0;

    let elements = _.cloneDeep(this.value);

    elements = this.executeOperations([OPERATIONS.POTENCY], elements);
    elements = this.executeOperations(
      [OPERATIONS.MULTIPLICATION, OPERATIONS.DIVISION],
      elements
    );
    elements = this.executeOperations(
      [OPERATIONS.ADDITION, OPERATIONS.SUBTRACTION],
      elements
    );
    return elements.pop().evaluate();
  }

  isOperation = (type) => type === ELEMENT_TYPES.OPERATION;

  executeOperations(operations, elements) {
    let n1, op, n2, ;

    for (let j = 0; j < elements.length; j++) {
      n1 = n2 = op = undefined;
      if (
        isOperation(elements[j].type) &&
        operations.includes(elements[j].value)
      ) {
        n1 = j - 1;
        op = j;
        n2 = j + 1;

        // a + b => c
        if (
          elements[n1] !== undefined &&
          elements[op] !== undefined &&
          elements[n2] !== undefined 
        ) {
          elements[n1] = this.executeOperation(
            elements[n1],
            elements[op],
            elements[n2]
          );
          elements.splice(op, 2);
          // + a => a
        } else if (
          elements[op] !== undefined &&
          elements[n2] !== undefined
        ) {
          if (elements[op].value === OPERATIONS.ADDITION) {
            elements[op] = new Number(elements[n2].evaluate());
          } else if (elements[op].value === OPERATIONS.SUBTRACTION) {
            elements[op] = new Number(-elements[n2].evaluate());
          }
          elements.splice(n2, 1);
          // a + => a
        } else if (
          elements[n1] !== undefined &&
          elements[op] !== undefined
        ) {
          elements.splice(op, 1);
        } else {
          j = 0;
        }
      }
    }

    return elements;
  }

  executeOperation(n1, op, n2) {
    let result;
    switch (op.value) {
      case OPERATIONS.POTENCY:
        result = this.evaluatePotency(n1, n2);
        return new Number(result.toFixed(2));
      case OPERATIONS.MULTIPLICATION:
        result = this.evaluateMultiplication(n1, n2);
        return new Number(result.toFixed(2));
      case OPERATIONS.DIVISION:
        result = this.evaluateDivision(n1, n2);
        return new Number(result.toFixed(2));
      case OPERATIONS.ADDITION:
        result = this.evaluateAddition(n1, n2);
        return new Number(result.toFixed(2));
      case OPERATIONS.SUBTRACTION:
        result = this.evaluateSubtraction(n1, n2);
        return new Number(result.toFixed(2));
      default:
        throw new CalcException("Unknown operation.");
    }
  }

  evaluatePotency(base, potency) {
    base = elementIsAFormula(base) && base.isEmpty() ? 1 : base.evaluate();

    potency =
      elementIsAFormula(potency) && potency.isEmpty() ? 1 : potency.evaluate();

    return Math.pow(base, potency);
  }

  evaluateMultiplication(x, y) {
    x = elementIsAFormula(x) && x.isEmpty() ? 1 : x.evaluate();

    y = elementIsAFormula(y) && y.isEmpty() ? 1 : y.evaluate();

    return x * y;
  }

  evaluateDivision(x, y) {
    x = elementIsAFormula(x) && x.isEmpty() ? 1 : x.evaluate();

    y = elementIsAFormula(y) && y.isEmpty() ? 1 : y.evaluate();

    return x / y;
  }

  evaluateAddition(x, y) {
    x = elementIsAFormula(x) && x.isEmpty() ? 0 : x.evaluate();

    y = elementIsAFormula(y) && y.isEmpty() ? 0 : y.evaluate();

    return x + y;
  }

  evaluateSubtraction(x, y) {
    x = elementIsAFormula(x) && x.isEmpty() ? 0 : x.evaluate();

    y = elementIsAFormula(y) && y.isEmpty() ? 0 : y.evaluate();

    return x - y;
  }

  findOperationsOfTypes(types, operations) {
    for (let type of types) {
      if (this.findOperationOfType(type, operations)) return true;
    }

    return false;
  }

  findOperationOfType(type, operations) {
    for (let op of operations) {
      if (op.value === type) return true;
    }
    return false;
  }
}
