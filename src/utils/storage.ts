export const setItem = (
  key: string,
  payload: object | string | number | any,
) => {
  return window.localStorage.setItem(key, JSON.stringify(payload));
};

export const getItem = (key: string) => {
  const storagedData = window.localStorage.getItem(key);
  return JSON.parse(storagedData);
};

export const removeItem = (key: string) => {
  window.localStorage.removeItem(key);
};
