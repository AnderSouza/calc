import { OPERATIONS, NUMBERS, COMMANDS, CODE_TYPES, KEY_CODES } from "./../../consts";

export default [
  {
    key: KEY_CODES.ENTER,
    config: { type: CODE_TYPES.COMMAND, code: COMMANDS.RESULT },
  },
  {
    key: KEY_CODES.ADDITION,
    config: { type: CODE_TYPES.OPERATION, code: OPERATIONS.ADDITION },
  },
  {
    key: KEY_CODES.POINT,
    config: { type: CODE_TYPES.NUMBER, code: NUMBERS.POINT },
  },
  {
    key: KEY_CODES.SUBTRACTION,
    config: { type: CODE_TYPES.OPERATION, code: OPERATIONS.SUBTRACTION },
  },
  {
    key: KEY_CODES.MULTIPLICATION,
    config: { type: CODE_TYPES.OPERATION, code: OPERATIONS.MULTIPLICATION },
  },
  {
    key: KEY_CODES.DIVISION,
    config: { type: CODE_TYPES.OPERATION, code: OPERATIONS.DIVISION },
  },
  {
    key: KEY_CODES.ZERO,
    config: { type: CODE_TYPES.NUMBER, code: NUMBERS.ZERO },
  },
  {
    key: KEY_CODES.ONE,
    config: { type: CODE_TYPES.NUMBER, code: NUMBERS.ONE },
  },
  {
    key: KEY_CODES.TWO,
    config: { type: CODE_TYPES.NUMBER, code: NUMBERS.TWO },
  },
  {
    key: KEY_CODES.THREE,
    config: { type: CODE_TYPES.NUMBER, code: NUMBERS.THREE },
  },
  {
    key: KEY_CODES.FOUR,
    config: { type: CODE_TYPES.NUMBER, code: NUMBERS.FOUR },
  },
  {
    key: KEY_CODES.FIVE,
    config: { type: CODE_TYPES.NUMBER, code: NUMBERS.FIVE },
  },
  {
    key: KEY_CODES.SIX,
    config: { type: CODE_TYPES.NUMBER, code: NUMBERS.SIX },
  },
  {
    key: KEY_CODES.SEVEN,
    config: { type: CODE_TYPES.NUMBER, code: NUMBERS.SEVEN },
  },
  {
    key: KEY_CODES.EIGHT,
    config: { type: CODE_TYPES.NUMBER, code: NUMBERS.EIGHT },
  },
  {
    key: KEY_CODES.NINE,
    config: { type: CODE_TYPES.NUMBER, code: NUMBERS.NINE },
  },
  {
    key: KEY_CODES.BACKSPACE,
    config: { type: CODE_TYPES.COMMAND, code: COMMANDS.CLEAR_ELEMENT },
  },
  {
    key: KEY_CODES.SHIFT,
    config: {
      key: KEY_CODES.BACKSPACE,
      config: {
        type: CODE_TYPES.COMMAND,
        code: COMMANDS.CLEAR,
      },
    },
  },
  {
    key: KEY_CODES.SHIFT,
    config: {
      key: KEY_CODES.CARET,
      config: { type: CODE_TYPES.OPERATION, code: OPERATIONS.POTENCY },
    },
  },
  {
    key: KEY_CODES.SHIFT,
    config: {
      key: KEY_CODES.OPENING_PARENTHESIS,
      config: {
        type: CODE_TYPES.OPERATION,
        code: OPERATIONS.OPENING_PARENTHESIS,
      },
    },
  },
  {
    key: KEY_CODES.SHIFT,
    config: {
      key: KEY_CODES.CLOSING_PARENTHESIS,
      config: {
        type: CODE_TYPES.OPERATION,
        code: OPERATIONS.CLOSING_PARENTHESIS,
      },
    },
  },
];
