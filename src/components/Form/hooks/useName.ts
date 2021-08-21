import { useMemo } from 'react';

export type useNameProps = { prefix?: string; name?: string };

const useName = ({ prefix = '', name = '' }: useNameProps): string => {
  return useMemo<string>(() => `${prefix}__${name.replaceAll('.', '__')}`
  , [prefix, name]);
};

export default useName;
