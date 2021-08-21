import classNames from 'classnames';
import { Button, ButtonProps } from 'primereact/button';
import React from 'react';
export interface BaseButtonProps extends ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'warning' | 'info' | 'help';
  outlined?: boolean;
  block?: boolean;
  sm?: boolean;
}

const BaseButton: React.FC<BaseButtonProps> = (props) => {
  const { variant, outlined, block, sm, ...rest } = props;

  return (
    <React.Fragment>
      {/*@ts-ignore*/}
      <Button
        className={classNames(rest.className, {
          [`p-button-${variant}`]: !!variant,
          'p-button-outlined': outlined,
          'p-button-sm': sm,
          'w-100': block,
        })}
        {...rest}
      />
    </React.Fragment>
  );
};

export default BaseButton;
