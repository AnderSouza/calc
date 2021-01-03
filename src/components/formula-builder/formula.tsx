import _ from "lodash";
import { Element } from "./element";
import { Number } from "./number";
import { Operator } from "./operator";
import { Buttons, ElementTypes } from "../../consts";
import { CalcException } from "../../exceptions";
import { isOperator, isFormula } from "./index.func";

export class Formula implements Element {
  value: Element[];
  type: ElementTypes;

  constructor(value: Element[] = []) {
    this.value = value;
    this.type = ElementTypes.FORMULA;
  }

  getElementByIndex(index?: number): Element | undefined {
    let found;
    this.value.forEach((value, _index) => {
      if (index == _index) found = value;
    });
    return found;
  }

  addElement(element: Element) {
    element = _.cloneDeep(element);
    this.value.push(element);
  }

  replaceElement(newElement: Element, pos: number) {
    newElement = _.cloneDeep(newElement);
    this.value = this.value.map((value, index) => {
      return pos === index ? newElement : value;
    });
  }

  removeElement(index: number) {
    this.value = this.value.filter((value, _index) => _index !== index);
  }

  size() {
    return this.value.length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  getLastElement() {
    const size = this.size();
    return size === 0 ? undefined : this.getElementByIndex(size - 1);
  }

  removeLastElement() {
    let size = this.size();
    if (size === 0)
      throw new CalcException(
        "Cannot remove last element because the formula is empty."
      );

    this.removeElement(size - 1);
  }

  replaceLastElement(newElement: Element) {
    let size = this.size();
    if (size === 0)
      throw new CalcException(
        "Cannot replace last element because the formula is empty."
      );
    this.replaceElement(newElement, size - 1);
  }

  getElement(trail: number[] = []) {
    trail = _.cloneDeep(trail);

    if (trail.length === 0) return this;
    if (this.value.length === 0)
      throw new CalcException("This formula has no elements.");

    let element = this.getElementByIndex(trail.shift());
    if (trail.length) {
      trail.forEach((pos) => {
        if (isFormula(element)) element = element.getElementByIndex(pos);
      });
    }

    return element;
  }

  evaluate() {
    if (this.value.length === 0) return 0;

    let elements = _.cloneDeep(this.value);

    elements = this.executeOperations([Buttons.POTENCY], elements);
    elements = this.executeOperations(
      [Buttons.MULTIPLICATION, Buttons.DIVISION],
      elements
    );
    elements = this.executeOperations(
      [Buttons.ADDITION, Buttons.SUBTRACTION],
      elements
    );
    const result = elements.shift();
    return result && result.type === ElementTypes.NUMBER
      ? result.evaluate()
      : 0;
  }

  executeOperations(operations: Buttons[], elements: Element[]) {
    let number1, number2, operator;
    let number1Index, number2Index, operatorIndex;

    for (let j = 0; j < elements.length; j++) {
      operatorIndex = j;
      operator = elements[j];
      if (isOperator(operator) && operations.includes(operator.value)) {
        number1Index = j - 1;
        number2Index = j + 1;
        operatorIndex = j;

        number1 = elements[number1Index];
        number2 = elements[number2Index];

        // a + b => c
        if (
          number1 !== undefined &&
          operator !== undefined &&
          number2 !== undefined
        ) {
          elements[number1Index] = this.executeOperation(
            number1,
            operator,
            number2
          );
          elements.splice(operatorIndex, 2);
          j--;

          // + a => a
        } else if (operator !== undefined && number2 !== undefined) {
          if (operator.value === Buttons.ADDITION) {
            elements[operatorIndex] = new Number(number2.evaluate().toString());
          } else if (operator.value === Buttons.SUBTRACTION) {
            elements[operatorIndex] = new Number(
              (-number2.evaluate()).toString()
            );
          }
          elements.splice(number2Index, 1);

          // a + => a
        } else if (number1 !== undefined && operator !== undefined) {
          elements.splice(operatorIndex, 1);
          j--;
        }
      }
    }

    return elements;
  }

  executeOperation(n1: Element, op: Operator, n2: Element) {
    let result;
    switch (op.value) {
      case Buttons.POTENCY:
        result = this.evaluatePotency(n1, n2);
        return new Number(result.toFixed(2));
      case Buttons.MULTIPLICATION:
        result = this.evaluateMultiplication(n1, n2);
        return new Number(result.toFixed(2));
      case Buttons.DIVISION:
        result = this.evaluateDivision(n1, n2);
        return new Number(result.toFixed(2));
      case Buttons.ADDITION:
        result = this.evaluateAddition(n1, n2);
        return new Number(result.toFixed(2));
      case Buttons.SUBTRACTION:
        result = this.evaluateSubtraction(n1, n2);
        return new Number(result.toFixed(2));
      default:
        throw new CalcException("Unknown operation.");
    }
  }

  evaluatePotency(base: Element, potency: Element) {
    const n1 = isFormula(base) && base.isEmpty() ? 1 : base.evaluate();
    const n2 = isFormula(potency) && potency.isEmpty() ? 1 : potency.evaluate();

    return Math.pow(n1, n2);
  }

  evaluateMultiplication(x: Element, y: Element) {
    const n1 = isFormula(x) && x.isEmpty() ? 1 : x.evaluate();
    const n2 = isFormula(y) && y.isEmpty() ? 1 : y.evaluate();

    return n1 * n2;
  }

  evaluateDivision(x: Element, y: Element) {
    const n1 = isFormula(x) && x.isEmpty() ? 1 : x.evaluate();
    const n2 = isFormula(y) && y.isEmpty() ? 1 : y.evaluate();

    return n1 / n2;
  }

  evaluateAddition(x: Element, y: Element) {
    const n1 = isFormula(x) && x.isEmpty() ? 0 : x.evaluate();
    const n2 = isFormula(y) && y.isEmpty() ? 0 : y.evaluate();

    return n1 + n2;
  }

  evaluateSubtraction(x: Element, y: Element) {
    const n1 = isFormula(x) && x.isEmpty() ? 0 : x.evaluate();
    const n2 = isFormula(y) && y.isEmpty() ? 0 : y.evaluate();

    return n1 - n2;
  }
}
