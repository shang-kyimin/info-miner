export function getValueFromLocalStorage(key: string) {
  if (typeof window !== "undefined") {
    const value = window.localStorage.getItem(key);

    if (value === null || value.trim() === "")
      return "";

    try {
      const parsedValue = JSON.parse(value);
      return parsedValue;
    } catch {
      return value;
    }
  }
}

export function setValueToLocalStorage(key: string, value: unknown) {
  if (typeof window !== "undefined") {
    const stringifiedValue = typeof value !== "string"
      ? JSON.stringify(value)
      : value;

    window.localStorage.setItem(key, stringifiedValue);

    return value;
  }
}


