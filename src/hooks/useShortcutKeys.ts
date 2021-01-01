import React, { useRef } from "react";
import { produce } from "immer";
import { WritableDraft } from "immer/dist/internal";
import { CalcException } from "../exceptions";

type Shortcut = {
  id: number;
  keys: string[];
};

export default (config: Shortcut[], callback: (code: number) => void) => {
  const pressedKeys = useRef([]);

  const keyWasAlreadyPressed = (pressedKeys: string[], key: string) => {
    let pressed = false;
    pressedKeys.forEach((pressedKey) => {
      if (pressedKey === key) pressed = true;
    });
    return pressed;
  };

  const getMatchingShortcut = (config: Shortcut[], pressedKeys: string[]) => {
    for (let shortcut of config) {
      let keysMatch = shortcut.keys.reduce(
        (acc, key) => (acc ? pressedKeys.includes(key) : false),
        true
      );
      if (keysMatch) return { found: true, shortcut: shortcut };
    }
    return { found: false, shortcut: null };
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!keyWasAlreadyPressed(pressedKeys.current, event.key)) {
      pressedKeys.current = produce(
        pressedKeys.current,
        (draft: WritableDraft<any>) => {
          draft.push(event.key);
        }
      );
    }
    const { found, shortcut } = getMatchingShortcut(
      config,
      pressedKeys.current
    );
    if (found) {
      if (shortcut === null)
        throw new CalcException("The shortcut was found but it's null.");

      callback(shortcut.id);
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    pressedKeys.current = produce(pressedKeys.current, (draft) =>
      draft.filter((value) => value !== event.key)
    );
  };

  return {
    handleKeyDown,
    handleKeyUp,
  };
};
