import React, { useState, useEffect } from "react";
import { Display, Keyboard } from "./../index";
import formulaInterpreter from "./formula/formula-interpreter";
import {
  getCurrentNumberFromFormulaText,
  getLastNumberFromFormulaText,
  handleNumberCode,
  handleOperationCode,
  handleCommandCode,
} from "./functions";
import { CODE_TYPES, COMMANDS } from "./../../consts";
import { CalcException } from "../../exceptions";
import KeyboardKeysManager from "./keyboard-keys-manager";

const Controller = () => {
  const [formulaText, setFormulaText] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const evaluation = formulaInterpreter(formulaText).evaluate();
    setResult(evaluation);
  }, [formulaText]);

  useEffect(() => {
    showResult && setFormulaText(result.toString());
  }, [showResult]);

  const handleButtonPress = (type, code) => {
    try {
      let newFormulaText;
      setShowResult(false);
      setShowError(false);
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
          try {
            newFormulaText = handleCommandCode(code, formulaText);
            setFormulaText(newFormulaText);
            if (code === COMMANDS.RESULT) setShowResult(true);
          } catch (exception) {}

          break;
        default:
          throw new CalcException("Unknown code type: " + type);
      }
    } catch (exception) {
      console.error(exception.message);
      setError(exception.displayMessage);
      setShowError(true);
    }
  };

  window.onkeydown = (event) => KeyboardKeysManager(event, handleButtonPress);
  window.onkeyup = (event) => KeyboardKeysManager(event, handleButtonPress);

  return (
    <div>
      <div>
        {console.clear()}
        {console.log("formulaText", formulaText)}
        {console.log("result", result)}
        {console.log("showResult", showResult)}
        <Display
          formula={formulaText}
          result={result}
          error={error}
          showResult={showResult}
          showError={showError}
        />
        <Keyboard handleButtonPress={handleButtonPress} />
      </div>
    </div>
  );
};

export default Controller;
