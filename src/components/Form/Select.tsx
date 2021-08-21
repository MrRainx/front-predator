import classNames from "classnames";
import { PrimeIcons } from "primereact/api";
import { Dropdown, DropdownProps } from "primereact/dropdown";
import React from "react";

type SelectProps = {
  name?: string;
  invalid?: boolean;
  onChangeFn?: (value: any) => void | any;
  loading?: boolean;
} & DropdownProps;

const Select: React.FC<SelectProps> = React.forwardRef((props, ref) => {
  const { invalid, name, className, onChange, onChangeFn, ...rest } = props;
  return (
    <Dropdown
      resetFilterOnHide
      filterMatchMode='contains'
      dropdownIcon={rest.loading ? "pi pi-spin pi-spinner" : PrimeIcons.CHEVRON_DOWN}
      disabled={rest?.loading}
      placeholder={rest?.loading ? "Buscando..." : rest.placeholder || "SELECCIONE"}
      {...rest}
      onChange={(evt) => {
        onChange && onChange(evt);
        onChangeFn && onChangeFn(evt.target.value);
      }}
      inputId={name}
      className={classNames(className, "w-100 p-inputtext-sm", {
        "p-invalid": invalid,
        disabled: rest.disabled,
      })}
      name={name}
      ref={(selectRef) => {
        try {
          //@ts-ignore
          ref(selectRef?.focusInput);
        } catch (error) {}
      }}
    />
  );
});

export default Select;
