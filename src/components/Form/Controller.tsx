import { get } from "lodash";
import React, { useEffect, useMemo, useRef } from "react";
import { RegisterOptions, useController } from "react-hook-form";
import useName from "./hooks/useName";

export type ControllerProps = {
  name?: string;
  rules?: RegisterOptions;
  defaultValue?: unknown;
  shouldUnregister?: boolean;
  refPath?: string;
};

const Controller: React.FC<ControllerProps> = (props) => {
  const { name, rules = {}, children } = props;

  const { defaultValue, shouldUnregister, refPath } = props;

  const { field, fieldState } = useController({
    //@ts-ignore
    name,
    defaultValue,
    rules,
    shouldUnregister,
  });

  const ref = useRef(null);

  useEffect(() => {
    field.ref(ref.current);
  }, [field]);

  const htmlName = useName({ prefix: "controller", name });

  const body = useMemo(() => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          //@ts-ignore
          name,
          ...field,
          //@ts-ignore
          ref: (childRef) => {
            //@ts-ignore
            if (childRef) ref.current = get(childRef, refPath, childRef);
          },
          invalid: fieldState.invalid,
        });
      }
      return child;
    });
  }, [children, name, field, fieldState.invalid, refPath]);

  return <div className={htmlName}>{body}</div>;
};

export default Controller;
