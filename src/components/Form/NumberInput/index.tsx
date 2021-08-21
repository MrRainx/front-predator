import classNames from 'classnames';
import { InputNumber, InputNumberProps } from 'primereact/inputnumber';
import React from 'react';

export type NumberInputProps = {
  name?: string;
  invalid?: boolean;
} & InputNumberProps;

const NumberInput: React.FC<NumberInputProps> = React.forwardRef(
  (props, ref) => {
    const { invalid, name, className, ...rest } = props;
    const { onChange, onBlur, value } = props;

    const onChangeFn = (evt: any) => {
      onChange && onChange(evt?.value);
      onBlur && onBlur(evt?.value);
    };

    return (
      <InputNumber
        {...rest}
        id={name}
        className={classNames(className, 'w-100', {
          'p-invalid': invalid,
        })}
        onChange={onChangeFn}
        // onBlur={onChangeFn}
        value={value}
        name={name}
        //@ts-ignore
        ref={ref}
      />
    );
  },
);

export default NumberInput;
