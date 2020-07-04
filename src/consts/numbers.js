import CalcException from "./../exceptions/calc-exception";

export const ZERO = "ZERO";
export const ONE = "ONE";
export const TWO = "TWO";
export const THREE = "THREE";
export const FOUR = "FOUR";
export const FIVE = "FIVE";
export const SIX = "SIX";
export const SEVEN = "SEVEN";
export const EIGHT = "EIGHT";
export const NINE = "NINE";
export const POINT = "POINT";

export const ZERO_CHAR = "0";
export const ONE_CHAR = "1";
export const TWO_CHAR = "2";
export const THREE_CHAR = "3";
export const FOUR_CHAR = "4";
export const FIVE_CHAR = "5";
export const SIX_CHAR = "6";
export const SEVEN_CHAR = "7";
export const EIGHT_CHAR = "8";
export const NINE_CHAR = "9";
export const POINT_CHAR = ".";


export const getNumberCharFromCode = (code) => {
  switch (code) {
    case ZERO:
      return ZERO_CHAR;
    case ONE:
      return ONE_CHAR;
    case TWO:
      return TWO_CHAR;
    case THREE:
      return THREE_CHAR;
    case FOUR:
      return FOUR_CHAR;
    case FIVE:
      return FIVE_CHAR;
    case SIX:
      return SIX_CHAR;
    case SEVEN:
      return SEVEN_CHAR;
    case EIGHT:
      return EIGHT_CHAR;
    case NINE:
      return NINE_CHAR;
    case POINT:
      return POINT_CHAR;
    default:
      throw new CalcException("Unknown number code.");
  }
};

export const getNumberCodeFromChar = (char) => {
  switch (char) {
    case ZERO_CHAR:
      return ZERO;
    case ONE_CHAR:
      return ONE;
    case TWO_CHAR:
      return TWO;
    case THREE_CHAR:
      return THREE;
    case FOUR_CHAR:
      return FOUR;
    case FIVE_CHAR:
      return FIVE;
    case SIX_CHAR:
      return SIX;
    case SEVEN_CHAR:
      return SEVEN;
    case EIGHT_CHAR:
      return EIGHT;
    case NINE_CHAR:
      return NINE;
    case POINT_CHAR:
      return POINT;
    default:
      throw new CalcException("Unknown number char.");
  }
};

export default {
  ZERO,
  ONE,
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
  NINE,
  POINT,
  ZERO_CHAR,
  ONE_CHAR,
  TWO_CHAR,
  THREE_CHAR,
  FOUR_CHAR,
  FIVE_CHAR,
  SIX_CHAR,
  SEVEN_CHAR,
  EIGHT_CHAR,
  NINE_CHAR,
  POINT_CHAR,
  getNumberCharFromCode,
  getNumberCodeFromChar
};
