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

type DisplayInfo = {
  show?: boolean;
  value?: string;
};

export default () => {
  const [formulaText, setFormulaText] = useState("");

  const defaultDisplayInfo: DisplayInfo = { show: false, value: "" };

  const [result, _setResult] = useState(defaultDisplayInfo);
  const [error, _setError] = useState(defaultDisplayInfo);

  const setResult = (obj: DisplayInfo) => _setResult({ ...result, ...obj });

  const setError = (obj: DisplayInfo) => _setError({ ...error, ...obj });

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

  const { handleKeyUp, handleKeyDown } = useShortcutKeys(
    shortcutsConfig,
    handleButtonPress
  );

  window.onkeydown = handleKeyDown;
  window.onkeyup = handleKeyUp;

  useEffect(() => {
    const formula = FormulaEvaluator(formulaText);
    setResult({ value: formula.evaluate().toString() });
  }, [formulaText]);

  useEffect(() => {
    const text = result.value ? result.value.toString() : "";
    if (result.show) setFormulaText(text);
  }, [result.show]);

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
