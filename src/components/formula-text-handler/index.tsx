import React, { useState, useEffect } from "react";
import { FormulaEvaluator, Display, Keyboard } from "../index";
import {
  handleNumberCode,
  handleOperationCode,
  handleCommandCode,
} from "./index.func";
import { Buttons, ButtonTypes, getButtonTypeFromCode } from "../../consts";
import { CalcException } from "../../exceptions";
import useShortcutKeys from "../../hooks/useShortcutKeys";
import shortcutsConfig from "./shortcuts-config";

export default () => {
  const [formulaText, setFormulaText] = useState("");
  const [result, _setResult] = useState({ show: false, value: "" });
  const [error, _setError] = useState({ show: false, value: "" });

  const setResult = (obj: { show?: boolean; value?: string }) =>
    _setResult({ ...result, ...obj });
  const setError = (obj: { show?: boolean; value?: string }) =>
    _setError({ ...error, ...obj });

  const { handleKeyUp, handleKeyDown } = useShortcutKeys(
    shortcutsConfig,
    handleButtonPress
  );

  useEffect(() => {
    const evaluation = FormulaEvaluator(formulaText).evaluate();
    setResult({ value: evaluation });
  }, [formulaText]);

  useEffect(() => {
    result.show && setFormulaText(result.value && result.value.toString());
  }, [result.show]);

  function handleButtonPress(code: number) {
    try {
      const type = getButtonTypeFromCode(code);
      setResult({ show: false });
      setError({ show: false });

      switch (type) {
        case ButtonTypes.NUMBER:
          try {
            const newFormulaText = handleNumberCode(code, formulaText);
            setFormulaText(newFormulaText);
          } catch (exception) {
            throw exception;
          }

          break;
        case ButtonTypes.OPERATION:
          try {
            const newFormulaText = handleOperationCode(code, formulaText);
            setFormulaText(newFormulaText);
          } catch (exception) {
            throw exception;
          }

          break;
        case ButtonTypes.COMMAND:
          try {
            setError({ show: false });
            const newFormulaText = handleCommandCode(code, formulaText);
            setFormulaText(newFormulaText);
            if (code === Buttons.RESULT) setResult({ show: true });
          } catch (exception) {
            throw exception;
          }

          break;
        default:
          throw new CalcException("Unknown code type: " + type);
      }
    } catch (exception) {
      setError({ value: exception.message, show: true });
    }
  }

  window.onkeydown = handleKeyDown;
  window.onkeyup = handleKeyUp;
  return (
    <div>
      <Display
        formula={formulaText}
        result={result.value}
        error={error.value}
        showResult={result.show}
        showError={error.show}
      />
      <Keyboard handleButtonPress={handleButtonPress} />
    </div>
  );
};
