import React from "react";
import { FaTimes, FaDivide, FaEquals, FaPlus, FaMinus } from "react-icons/fa";
import { RiSubtractLine } from "react-icons/ri";
import { CalcException } from "../../../exceptions";
import { BUTTONS } from "../../../consts/index";
export const Icon = ({code}) => {
  switch (code) {
    case BUTTONS.ADDITION:
      return <FaPlus />;
    case BUTTONS.CLEAR:
      return "C";
    case BUTTONS.CLEAR_ELEMENT:
      return "CE";
    case BUTTONS.CLOSING_PARENTHESIS:
      return ")";
    case BUTTONS.DIVISION:
      return <FaDivide />;
    case BUTTONS.EIGHT:
      return "8";
    case BUTTONS.FIVE:
      return "5";
    case BUTTONS.FOUR:
      return "4";
    case BUTTONS.MULTIPLICATION:
      return <FaTimes />;
    case BUTTONS.NINE:
      return "9";
    case BUTTONS.ONE:
      return "1";
    case BUTTONS.OPENING_PARENTHESIS:
      return "(";
    case BUTTONS.POINT:
      return ".";
    case BUTTONS.POTENCY:
      return "^";
    case BUTTONS.RESULT:
      return <FaEquals />;
    case BUTTONS.SEVEN:
      return "7";
    case BUTTONS.SIX:
      return "6";
    case BUTTONS.SUBTRACTION:
      return <FaMinus />;
    case BUTTONS.THREE:
      return "3";
    case BUTTONS.TWO:
      return "2";
    case BUTTONS.ZERO:
      return "0";
    default:
      throw new CalcException(`Invalid code for icon: ${code}`);
  }
};
