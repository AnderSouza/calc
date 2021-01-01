import { Buttons, ButtonTypes } from "../../consts";

export const ORDERED_BUTTONS = [
  { code: Buttons.CLEAR, type: ButtonTypes.COMMAND },
  { code: Buttons.CLEAR_ELEMENT, type: ButtonTypes.COMMAND },
  { code: Buttons.DIVISION, type: ButtonTypes.OPERATION },
  { code: Buttons.MULTIPLICATION, type: ButtonTypes.OPERATION },
  {
    code: Buttons.OPENING_PARENTHESIS,
    type: ButtonTypes.OPERATION,
    isWide: false,
  },
  {
    code: Buttons.CLOSING_PARENTHESIS,
    type: ButtonTypes.OPERATION,
    isWide: false,
  },
  { code: Buttons.POTENCY, type: ButtonTypes.OPERATION },
  { code: Buttons.SUBTRACTION, type: ButtonTypes.OPERATION },
  { code: Buttons.SEVEN, type: ButtonTypes.NUMBER },
  { code: Buttons.EIGHT, type: ButtonTypes.NUMBER },
  { code: Buttons.NINE, type: ButtonTypes.NUMBER },
  { code: Buttons.ADDITION, type: ButtonTypes.OPERATION, isTall: true },
  { code: Buttons.FOUR, type: ButtonTypes.NUMBER },
  { code: Buttons.FIVE, type: ButtonTypes.NUMBER },
  { code: Buttons.SIX, type: ButtonTypes.NUMBER },
  { code: Buttons.ONE, type: ButtonTypes.NUMBER },
  { code: Buttons.TWO, type: ButtonTypes.NUMBER },
  { code: Buttons.THREE, type: ButtonTypes.NUMBER },
  { code: Buttons.RESULT, type: ButtonTypes.COMMAND, isTall: true },
  { code: Buttons.ZERO, type: ButtonTypes.NUMBER, isWide: true },
  { code: Buttons.POINT, type: ButtonTypes.NUMBER },
];
