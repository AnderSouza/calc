import React from "react";
import { FaTimes, FaDivide, FaEquals, FaPlus, FaMinus } from "react-icons/fa";
import { CalcException } from "../../../exceptions";
import { Buttons } from "../../../consts/index";
export const Icon = ({ code }: { code: number }) => {
  switch (code) {
    case Buttons.ADDITION:
      return <FaPlus />;
    case Buttons.CLEAR:
      return <>C</>;
    case Buttons.CLEAR_ELEMENT:
      return <>CE</>;
    case Buttons.CLOSING_PARENTHESIS:
      return <>)</>;
    case Buttons.DIVISION:
      return <FaDivide />;
    case Buttons.EIGHT:
      return <>8</>;
    case Buttons.FIVE:
      return <>5</>;
    case Buttons.FOUR:
      return <>4</>;
    case Buttons.MULTIPLICATION:
      return <FaTimes />;
    case Buttons.NINE:
      return <>9</>;
    case Buttons.ONE:
      return <>1</>;
    case Buttons.OPENING_PARENTHESIS:
      return <>(</>;
    case Buttons.POINT:
      return <>.</>;
    case Buttons.POTENCY:
      return <>^</>;
    case Buttons.RESULT:
      return <FaEquals />;
    case Buttons.SEVEN:
      return <>7</>;
    case Buttons.SIX:
      return <>6</>;
    case Buttons.SUBTRACTION:
      return <FaMinus />;
    case Buttons.THREE:
      return <>3</>;
    case Buttons.TWO:
      return <>2</>;
    case Buttons.ZERO:
      return <>0</>;
    default:
      throw new CalcException(`Invalid code for icon: ${code}`);
  }
};
