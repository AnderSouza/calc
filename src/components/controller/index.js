import React, { useState, useEffect } from "react";

import { Display, Keyboard } from "./../index";
import formulaInterpreter from "./formula/formula-interpreter";
import {
  getCurrentNumberFromFormulaText,
  handleNumberCode,
  handleOperationCode,
  handleCommandCode
} from "./functions";
import { CODE_TYPES } from "./../../consts";
import {CalcException} from "../../exceptions";

const Controller = () => {
  const [formulaText, setFormulaText] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    console.log("formulaText", formulaText);
    console.log("ELEMENTS", formulaInterpreter(formulaText).elements);
    const evaluation = "15";
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
          throw new CalcException("Unknown code type: "+type);
      }
    } catch (exception) {
      console.error(exception.message);
    }
  };

  return (
    <div>
      {"FormulaText: " + formulaText}
      <br />
      {"Result: " + result}
      <br />
      {"CurrentNumber: " + getCurrentNumberFromFormulaText(formulaText)}
      <br />
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
