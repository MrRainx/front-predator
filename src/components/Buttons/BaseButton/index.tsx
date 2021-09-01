import classNames from 'classnames';
import { Button, ButtonProps } from 'primereact/button';
import React from 'react';
export interface BaseButtonProps extends ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'warning' | 'info' | 'help';
  outlined?: boolean;
  block?: boolean;
  sm?: boolean;
  lg?: boolean;
}

const BaseButton: React.FC<BaseButtonProps> = (props) => {
  const { variant, outlined, block, sm, lg, className, ...rest } = props;

  return (
    <React.Fragment>
      {/*@ts-ignore*/}
      <Button
        className={classNames(className, {
          [`p-button-${variant}`]: !!variant,
          'p-button-outlined': outlined,
          'p-button-sm': sm,
          'p-button-lg': lg,
          'w-100': block,
        })}
        {...rest}
      />
    </React.Fragment>
  );
};

export default BaseButton;
