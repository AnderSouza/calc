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

  const getMatchingShortcut = (config, pressedKeys) => {
    for (let shortcut of config) {
      // let keysMatch = pressedKeys.reduce(
      //   (acc, key) => (acc ? shortcut.keys.includes(key) : false),
      //   true
      // );

      let keysMatch = shortcut.keys.reduce(
        (acc, key) => (acc ? pressedKeys.includes(key) : false),
        true
      );
      if (keysMatch) return [true, shortcut];
    }
    return [false, null];
  };

  const handleKeyDown = (event) => {
    if (!keyWasAlreadyPressed(pressedKeys.current, event.key)) {
      pressedKeys.current = produce(pressedKeys.current, (draft) => {
        draft.push(event.key);
      });
    }
    const [found, shortcut] = getMatchingShortcut(config, pressedKeys.current);
    if (found) callback(shortcut.id);
  };

  const handleKeyUp = (event) => {
    pressedKeys.current = produce(pressedKeys.current, (draft) =>
      draft.filter((value) => value !== event.key)
    );
  };

  return {
    handleKeyDown,
    handleKeyUp,
  };
};
