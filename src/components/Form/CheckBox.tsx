import {
  Checkbox,
  CheckboxChangeParams,
  CheckboxProps,
} from 'primereact/checkbox';
import React from 'react';

type CheckBoxProps = {
  label?: string;
  invalid?: boolean;
} & CheckboxProps;

const CheckBox = React.forwardRef((props: CheckBoxProps, ref) => {
  const { invalid, name, className, ...rest } = props;
  const { onChange, value } = props;
  const onChangeFn = (e: CheckboxChangeParams) => {
    //@ts-ignore
    onChange(e.checked);
  };

  return (
    <div className="w-100 d-flex flex-row align-items-center">
      <Checkbox
        {...rest}
        inputId={props.name}
        onChange={onChangeFn}
        checked={value}
      />
      <label
        className="ms-1 align-self-center"
        htmlFor={props.name}
        //@ts-ignore
        ref={(currentRef) => {
          try {
            if (!ref) {
              //@ts-ignore
              ref = currentRef;
            }
          } catch (error) {}
        }}
      >
        {props.label}
      </label>
    </div>
  );
});

export default CheckBox;
