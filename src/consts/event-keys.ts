import { Buttons } from "./buttons";
import { CalcException } from "../exceptions";

export const EventKeys = {
  ENTER: "Enter",
  ONE: "1",
  TWO: "2",
  THREE: "3",
  FOUR: "4",
  FIVE: "5",
  SIX: "6",
  SEVEN: "7",
  EIGHT: "8",
  NINE: "9",
  ZERO: "0",
  POINT: ".",
  ADDITION: "+",
  SUBTRACTION: "-",
  MULTIPLICATION: "*",
  DIVISION: "/",
  SHIFT: "Shift",
  BACKSPACE: "Backspace",
  OPENING_PARENTHESIS: "(",
  CLOSING_PARENTHESIS: ")",
  POTENCY: "^",
};

export const getEventKeyFromButtonCode = (code: number) => {
  switch (code) {
    case Buttons.CLEAR:
    case Buttons.CLEAR_ELEMENT:
    case Buttons.RESULT:
      return "";
    case Buttons.POINT:
      return EventKeys.POINT;
    case Buttons.ZERO:
      return EventKeys.ZERO;
    case Buttons.ONE:
      return EventKeys.ONE;
    case Buttons.TWO:
      return EventKeys.TWO;
    case Buttons.THREE:
      return EventKeys.THREE;
    case Buttons.FOUR:
      return EventKeys.FOUR;
    case Buttons.FIVE:
      return EventKeys.FIVE;
    case Buttons.SIX:
      return EventKeys.SIX;
    case Buttons.SEVEN:
      return EventKeys.SEVEN;
    case Buttons.EIGHT:
      return EventKeys.EIGHT;
    case Buttons.NINE:
      return EventKeys.NINE;
    case Buttons.ADDITION:
      return EventKeys.ADDITION;
    case Buttons.DIVISION:
      return EventKeys.DIVISION;
    case Buttons.MULTIPLICATION:
      return EventKeys.MULTIPLICATION;
    case Buttons.SUBTRACTION:
      return EventKeys.SUBTRACTION;
    case Buttons.POTENCY:
      return EventKeys.POTENCY;
    case Buttons.OPENING_PARENTHESIS:
      return EventKeys.OPENING_PARENTHESIS;
    case Buttons.CLOSING_PARENTHESIS:
      return EventKeys.CLOSING_PARENTHESIS;
    default:
      new CalcException(`Invalid code ${code}`);
  }
};

export default {
  EventKeys,
  getEventKeyFromButtonCode,
};
