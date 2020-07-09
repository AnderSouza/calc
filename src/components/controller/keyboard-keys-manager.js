import config from "./keyboard-keys-config";

let keysDown = [];

const hasEventWithKeyCode = (keysDown, keyCode) => {
  let has = false;
  keysDown.forEach((value) => {
    if (value.keyCode === keyCode) has = true;
  });
  return has;
};

const KeyboardKeysManager = (event, callback) => {
  if (event.type === "keydown") {
    if (hasEventWithKeyCode(keysDown, event.keyCode)) {
      return;
    } else {
      keysDown.push(event);
    }
  } else if (event.type === "keyup") {
    const newKeysDown = keysDown.filter(
      (value) => value.keyCode !== event.keyCode
    );
    keysDown = newKeysDown;
    return;
  }
  config.forEach((current) => {
    let keysAreFulfilled = true;
    let config = current.config;
    let key = current.key;
    while (true) {
      let has = hasEventWithKeyCode(keysDown, key);
      if (has) {
        if (config.type) {
          break;
        } else {
          key = config.key;
          config = config.config;
        }
      } else {
        keysAreFulfilled = false;
        break;
      }
    }
    if (keysAreFulfilled) {
      callback(config.type, config.code);
    }
  });
};

export default KeyboardKeysManager;
