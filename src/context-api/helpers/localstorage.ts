export const setLocalStorage = (key: string, value: any) => {
  try {
    window.localStorage.setItem(key, value);
  } catch (e) {
    console.error(e)
  }
}

export const getLocalStorage = (key: string, initialValue?: any) => {
  try {
    const value = window.localStorage.getItem(key);
    return value ? value : initialValue;
  } catch (e) {
    console.error(e)
    return initialValue;
  }
}
