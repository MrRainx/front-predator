import React, { useEffect, useRef } from 'react';
import { RegisterOptions, useController } from 'react-hook-form';

export type ControlledWrapperProps = {
  name?: string;
  rules?: RegisterOptions;
  defaultValue?: unknown;
  shouldUnregister?: boolean;
  refPath?: string | any;
};

//@ts-ignore
const ControlledWrapper: React.FC<ControlledWrapperProps> = ({
  children,
  name,
  rules,
  defaultValue = null,
  shouldUnregister = false,
}) => {
  const { field, fieldState } = useController({
    //@ts-ignore
    name,
    defaultValue,
    rules,
    shouldUnregister,
  });
  const ref = useRef(null);

  useEffect(() => {
    try {
      field.ref(ref.current);
    } catch (error) {}
  }, [field]);

  return React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        ...field,
        //@ts-ignore
        ref: ref?.current,
        invalid: fieldState.invalid,
      });
    }
    return child;
  });
};

export default ControlledWrapper;
