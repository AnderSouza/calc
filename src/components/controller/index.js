import React, { useState, useEffect } from "react";

import { Display, Keyboard } from "./../index";
import formulaInterpreter from "./formula/formula-interpreter";
import {
  getCurrentNumberFromFormulaText,
  handleNumberCode,
  handleOperationCode,
  handleCommandCode,
  handleKeyPress,
} from "./functions";
import { NUMBERS, CODE_TYPES, OPERATIONS, COMMANDS } from "./../../consts";
import { CalcException } from "../../exceptions";

const Controller = () => {
  const [formulaText, setFormulaText] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    const evaluation = formulaInterpreter(formulaText).evaluate();
    setResult(evaluation);
  }, [formulaText]);

  const handleButtonPress = (type, code) => {
    try {
      let newFormulaText;
      switch (type) {
        case CODE_TYPES.NUMBER:
          newFormulaText = handleNumberCode(code, formulaText);
          setFormulaText(newFormulaText);
          break;
        case CODE_TYPES.OPERATION:
          newFormulaText = handleOperationCode(code, formulaText);
          setFormulaText(newFormulaText);
          break;
        case CODE_TYPES.COMMAND:
          newFormulaText = handleCommandCode(code, formulaText);
          setFormulaText(newFormulaText);
          break;
        default:
          throw new CalcException("Unknown code type: " + type);
      }
    } catch (exception) {
      console.error(exception.message);
    }
  };

  window.onkeypress = handleKeyPress(handleButtonPress);
  
  return (
    <div>
      <div>
        <Display
          formula={formulaText}
          result={result}
          currentNumber={getCurrentNumberFromFormulaText(formulaText)}
        />
        <Keyboard handleButtonPress={handleButtonPress} />
      </div>
    </div>
  );
};

export default Controller;
