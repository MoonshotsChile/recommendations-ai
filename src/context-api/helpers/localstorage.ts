export const setLocalStorage = (key: string, value: any) => {
  try {
    window.localStorage.setItem(key, value);
  } catch (e) {
    console.error(e)
  }
}

export const getLocalStorage = (key: string) => {
  try {
    return window.localStorage.getItem(key);
  } catch (e) {
    console.error(e)
    return '';
  }
}
