import React, { useState, useEffect } from "react";
import { FormulaEvaluator, Display, Keyboard } from "../index";
import {
  handleNumberCode,
  handleOperationCode,
  handleCommandCode,
} from "./functions.index";
import { BUTTONS, BUTTON_TYPES } from "../../consts";
import { CalcException } from "../../exceptions";
import useShortcutKeys from "../../hooks/useShortcutKeys";
import shortcutsConfig from "./shortcuts-config";

export default FormulaTextHandler = () => {
  const [formulaText, setFormulaText] = useState("");
  const [result, _setResult] = useState({ show: false, value: "" });
  const [error, _setError] = useState({ show: false, value: "" });

  const setResult = (obj) => _setResult({ ...result, ...obj });
  const setError = (obj) => _setResult({ ...error, ...obj });

  const { handleKeyUp, handleKeyDown } = useShortcutKeys(
    shortcutsConfig,
    handleButtonPress
  );

  useEffect(() => {
    const evaluation = FormulaEvaluator(formulaText).evaluate();
    setResult({ value: evaluation });
  }, [formulaText]);

  useEffect(() => {
    result.show && setFormulaText(result.toString());
  }, [result.show]);

  function handleButtonPress(code) {
    try {
      const type = BUTTON_TYPES.getButtonTypeFromCode(code);
      setResult({ show: false });
      setError({ show: false });
      switch (type) {
        case CODE_TYPES.NUMBER:
          try {
            const newFormulaText = handleNumberCode(code, formulaText);
            setFormulaText(newFormulaText);
          } catch (exception) {
            throw exception;
          }

          break;
        case CODE_TYPES.OPERATION:
          try {
            const newFormulaText = handleOperationCode(code, formulaText);
            setFormulaText(newFormulaText);
          } catch (exception) {
            throw exception;
          }

          break;
        case CODE_TYPES.COMMAND:
          try {
            const newFormulaText = handleCommandCode(code, formulaText);
            setFormulaText(newFormulaText);
            if (code === BUTTONS.RESULT) setResult({ show: true });
          } catch (exception) {
            throw exception;
          }

          break;
        default:
          throw new CalcException("Unknown code type: " + type);
      }
    } catch (exception) {
      setError({ value: exception.displayMessage, show: true });
    }
  }

  window.onkeydown = handleKeyDown;
  window.onkeyup = handleKeyUp;

  return (
    <div>
      <Display
        formula={formulaText}
        result={result}
        error={error}
        showResult={result.show}
        showError={error.show}
      />
      <Keyboard handleButtonPress={handleButtonPress} />
    </div>
  );
};

export default FormulaTextHandler;
