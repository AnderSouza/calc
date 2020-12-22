import React, { useRef } from "react";
import { produce } from "immer";

export default (config, callback) => {
  const pressedKeys = useRef([]);

  const keyWasAlreadyPressed = (pressedKeys, key) => {
    let pressed = false;
    pressedKeys.forEach((pressedKey) => {
      if (pressedKey === key) pressed = true;
    });
    return pressed;
  };

  const handleKeyDown = (event) => {
    if (!keyWasAlreadyPressed(pressedKeys, event.key)) {
      pressedKeys.current = produce(pressedKeys, (draft) => {
        draft.push(event.key);
      });
    }
    const [found, shortcut] = getMatchingShortcut(config, pressedKeys);
    if (found) callback(shortcut.id);
  };

  const handleKeyUp = (event) => {
    pressedKeys.current = produce(pressedKeys, (draft) =>
      draft.filter((value) => value.key !== event.key)
    );
  };

  getMatchingShortcut = (config, pressedKeys) => {
    for (let shortcut of config) {
      let keysMatch = shortcut.keys.reduce(
        (acc, key) => (acc ? pressedKeys.includes(key) : false),
        true
      );
      if (keysMatch) return [true, shortcut];
    }
    return [false, null];
  };

  return {
    handleKeyDown,
    handleKeyUp,
  };
};
