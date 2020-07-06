import {CalcException} from "../exceptions";

export const CLEAR_ELEMENT = "CEL";
export const CLEAR = "CLE";
export const RESULT = "RES";
export const CLEAR_ELEMENT_CHAR = "CE";
export const CLEAR_CHAR = "C";
export const RESULT_CHAR = "=";

export const getCommandCharFromCode = (code) => {
  switch (code) {
    case CLEAR:
      return CLEAR_CHAR;
    case CLEAR_ELEMENT:
      return CLEAR_ELEMENT_CHAR;
    case RESULT:
      return RESULT_CHAR;
    default:
      throw new CalcException("Unkow command code.");
  }
};

export default {
  CLEAR_ELEMENT,
  CLEAR,
  RESULT,
  CLEAR_ELEMENT_CHAR,
  CLEAR_CHAR,
  RESULT_CHAR,
  getCommandCharFromCode
};
