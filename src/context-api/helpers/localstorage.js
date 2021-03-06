
export const setLocalStorage = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    window.localStorage.setItem(key, value)
  }
}

export const getLocalStorage = (key) => {
  const value = window.localStorage.getItem(key);
  try {
    return JSON.parse(value)
  } catch (e) {
    return value;
  }
}

