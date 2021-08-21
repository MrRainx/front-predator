export const setRef = (ref: any) => (inputReft: any) => {
  if (inputReft) ref.current = inputReft;
};
