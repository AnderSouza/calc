import { CalcException } from "../exceptions";
import { EVENT_KEYS } from "./index";

export const ZERO = 0;
export const ONE = 1;
export const TWO = 2;
export const THREE = 3;
export const FOUR = 4;
export const FIVE = 5;
export const SIX = 6;
export const SEVEN = 7;
export const EIGHT = 8;
export const NINE = 9;
export const POINT = 10;
export const CLEAR_ELEMENT = 11;
export const CLEAR = 12;
export const RESULT = 13;
export const ADDITION = 14;
export const SUBTRACTION = 15;
export const MULTIPLICATION = 16;
export const DIVISION = 17;
export const POTENCY = 18;
export const OPENING_PARENTHESIS = 19;
export const CLOSING_PARENTHESIS = 20;

export const getButtonCodeFromEventKey = (key) => {
  switch (code) {
    case EVENT_KEYS.POINT:
      return POINT;
    case EVENT_KEYS.ZERO:
      return ZERO;
    case EVENT_KEYS.ONE:
      return ONE;
    case EVENT_KEYS.TWO:
      return TWO;
    case EVENT_KEYS.THREE:
      return THREE;
    case EVENT_KEYS.FOUR:
      return FOUR;
    case EVENT_KEYS.FIVE:
      return FIVE;
    case EVENT_KEYS.SIX:
      return SIX;
    case EVENT_KEYS.SEVEN:
      return SEVEN;
    case EVENT_KEYS.EIGHT:
      return EIGHT;
    case EVENT_KEYS.NINE:
      return NINE;
    case EVENT_KEYS.ADDITION:
      return ADDITION;
    case EVENT_KEYS.DIVISION:
      return DIVISION;
    case EVENT_KEYS.MULTIPLICATION:
      return MULTIPLICATION;
    case EVENT_KEYS.SUBTRACTION:
      return SUBTRACTION;
    case EVENT_KEYS.CARET:
      return POTENCY;
    case EVENT_KEYS.OPENING_PARENTHESIS:
      return OPENING_PARENTHESIS;
    case EVENT_KEYS.CLOSING_PARENTHESIS:
      return CLOSING_PARENTHESIS;
    default:
      throw new CalcException(`Invalid key: ${key}`);
  }
};
