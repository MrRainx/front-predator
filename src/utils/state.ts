export const setState = <T>(state: T) => {
  return ({ setState: setter }) => setter(state);
};

const actions = { setState };

export default actions;
