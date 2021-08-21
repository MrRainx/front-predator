import classNames from "classnames";
import { InputTextarea, InputTextareaProps } from "primereact/inputtextarea";
import React from "react";

type TextAreaProps = {
  name?: string;
  invalid?: boolean;
  changers?: Function[] | string[];
} & InputTextareaProps;

//@ts-ignore
const TextArea: React.FC<TextAreaProps> = React.forwardRef((props, ref) => {
  const { invalid, name, className, ref: test, ...rest } = props;
  const { onChange,  changers } = props;

  const onChangeFn = (evt: any) => {
    changers?.forEach?.((changer) => {
      if (typeof changer === "function") {
        evt.target.value = changer(evt.target.value);
      } else if (typeof changer === "string") {
        evt.target.value = evt.target.value?.[changer]();
      }
    });
    onChange && onChange(evt);
  };

  return (
    <InputTextarea
      {...rest}
      id={name}
      className={classNames(className, "w-100", {
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

export default TextArea;
