import classNames from "classnames";
import {
  Password as PrimePassword,
  PasswordProps as PrimePasswordProps,
} from "primereact/password";
import React from "react";

type PasswordProps = {
  name?: string;
  invalid?: boolean;
  changers?: Function[] | string[];
} & PrimePasswordProps;

//@ts-ignore
const Password: React.FC<PasswordProps> = React.forwardRef((props, ref) => {
  const { invalid, name, className, ref: test, ...rest } = props;
  const { onChange, onBlur, changers } = props;

  const onChangeFn = (evt: any) => {
    changers?.forEach?.((changer) => {
      if (typeof changer === "function") {
        evt.target.value = changer(evt.target.value);
      } else if (typeof changer === "string") {
        evt.target.value = evt.target.value?.[changer]();
      }
    });
    onChange && onChange(evt);
    onBlur && onBlur(evt);
  };

  return (
    <PrimePassword
      {...rest}
      // id={name}
      inputId={name}
      className={classNames(className, "w-100")}
      inputClassName={classNames(rest.inputClassName, "w-100", {
        "p-invalid": invalid,
      })}
      onChange={onChangeFn}
      onBlur={onChangeFn}
      name={name}
      //@ts-ignore
      ref={ref}
    />
  );
});

export default Password;
