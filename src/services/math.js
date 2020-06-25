import OPERATIONS from "./../const/operations";

export const addition = (prev, curr) => {
  return prev + curr;
};

export const subtraction = (prev, curr) => {
  return prev - curr;
};

export const multiplication = (prev, curr) => {
  return prev * curr;
};

export const division = (prev, curr) => {
  return prev / curr;
};

export const potency = (prev, curr) => {
  return 0;
};

export const openingParenthesis = (prev, curr) => {
  return 0;
};

export const closingParenthesis = (prev, curr) => {
  return 0;
};

export const clearElement = (prev, curr) => {
  return 0;
};

export const clear = (prev, curr) => {
  return 0;
};

export const result = (prev, curr) => {
  return 0;
};

export const executeSingleOperation = (operation, values) => {
  switch (operation) {
    case OPERATIONS.ADDITION:
      return values.reduce(addition);
    case OPERATIONS.SUBTRACTION:
      return values.reduce(subtraction);
    case OPERATIONS.MULTIPLICATION:
      return values.reduce(multiplication);
    case OPERATIONS.DIVISION:
      return values.reduce(division);
    case OPERATIONS.POTENCY:
      return values.reduce(potency);
    case OPERATIONS.OPENING_PARENTHESIS:
      return values.reduce(openingParenthesis);
    case OPERATIONS.CLOSING_PARENTHESIS:
      return values.reduce(closingParenthesis);
    case OPERATIONS.CLEAR_ELEMENT:
      return values.reduce(clearElement);
    case OPERATIONS.CLEAR:
      return values.reduce(clear);
    case OPERATIONS.RESULT:
      return values.reduce(result);
    default:
      break;
  }
};

export const executeWholeExpression = (formula) => {
  if (formula.length === 0) return 0;

  return 0;
};
