import { useMemo } from 'react';
import { AbstractWs } from 'src/services/Base.service';

const useWS = <T>(ws): T => {
  //@ts-ignore
  return useMemo<T>(() => new ws(), []);
};

export default useWS;
