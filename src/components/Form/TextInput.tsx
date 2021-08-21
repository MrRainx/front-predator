import classNames from "classnames";
import { InputText, InputTextProps } from "primereact/inputtext";
import React from "react";

type TextInputProps = {
  name?: string;
  invalid?: boolean;
  changers?: Function[] | string[];
} & InputTextProps;

//@ts-ignore
const TextInput: React.FC<TextInputProps> = React.forwardRef((props, ref) => {
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
    <InputText
      {...rest}
      id={name}
      className={classNames(className, "w-100", {
        "p-invalid": invalid,
      })}
      onChange={onChangeFn}
      // onBlur={onChangeFn}
      name={name}
      //@ts-ignore
      ref={ref}
    />
  );
});

export default TextInput;
