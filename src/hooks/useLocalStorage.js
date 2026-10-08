import { useState } from "react";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const savedValue = localStorage.getItem(key);

    if (savedValue !== null) {
      return JSON.parse(savedValue);
    }

    return initialValue;
  });

  function saveValue(newValue) {
    setValue(newValue);
    localStorage.setItem(
      key,
      JSON.stringify(newValue)
    );
  }

  return [value, saveValue];
}

export default useLocalStorage;