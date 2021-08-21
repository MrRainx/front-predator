import { toFrontDate } from "./utils/funciones";
import classNames from "classnames";
import { Calendar, CalendarProps } from "primereact/calendar";
import React from "react";

type DateInputProps = {
  name?: string;
  invalid?: boolean;
  changers?: Function[] | string[];
} & CalendarProps;

const DateInput: React.FC<DateInputProps> = React.forwardRef((props, ref) => {
  const { invalid, name, className, ...rest } = props;
  const { onChange, onBlur, changers, value } = props;

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
    <Calendar
      //   id={name}
      className={classNames({
        //@ts-ignore
        [className]: true,
        "w-100": true,
        "p-invalid": invalid,
      })}
      inputId={name}
      inputClassName='w-100'
      onChange={onChangeFn}
      dateFormat='dd/mm/yy'
      placeholder='DD/MM/yyyy'
      monthNavigator
      yearNavigator
      yearRange='1930:2030'
      value={toFrontDate(value)}
      //@ts-ignore
      //   ref={ref}
      inputRef={ref}
      {...rest}
    />
  );
});

export default DateInput;
