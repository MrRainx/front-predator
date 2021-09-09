import classNames from 'classnames';
import { Button, ButtonProps } from 'primereact/button';
import React, { PropsWithChildren } from 'react';
export interface BaseButtonProps extends PropsWithChildren<ButtonProps> {
  variant?: 'primary' | 'secondary' | 'danger' | 'warning' | 'info' | 'help';
  outlined?: boolean;
  block?: boolean;
  sm?: boolean;
  lg?: boolean;
  text?: boolean;
  rounded?: boolean;
  /**
   * Clip Board
   */

  clipBoardText?: string;
  clipBoardItems?: ClipboardItems;

  /**
   * Efectos float
   */
  floatEnd?: boolean;
  floatStart?: boolean;
  floatNone?: boolean;

  floatSmEnd?: boolean;
  floatSmStart?: boolean;
  floatSmNone?: boolean;

  floatMdEnd?: boolean;
  floatMdStart?: boolean;
  floatMdNone?: boolean;

  floatLgEnd?: boolean;
  floatLgStart?: boolean;
  floatLgNone?: boolean;

  floatXlEnd?: boolean;
  floatXlStart?: boolean;
  floatXlNone?: boolean;

  floatXxlEnd?: boolean;
  floatXxlStart?: boolean;
  floatXxlNone?: boolean;
}

const BaseButton: React.FC<BaseButtonProps> = (props) => {
  const {
    variant,
    outlined,
    block,
    sm,
    lg,
    className,
    rounded,
    text,
    ...rest
  } = props;

  const { floatEnd, floatStart, floatNone } = rest;
  const { floatSmEnd, floatSmStart, floatSmNone } = rest;
  const { floatMdEnd, floatMdStart, floatMdNone } = rest;
  const { floatLgEnd, floatLgStart, floatLgNone } = rest;
  const { floatXlEnd, floatXlStart, floatXlNone } = rest;
  const { floatXxlEnd, floatXxlStart, floatXxlNone } = rest;

  return (
    <React.Fragment>
      {/*@ts-ignore*/}
      <Button
        className={classNames(className, {
          'p-button-rounded': rounded,
          [`p-button-${variant}`]: !!variant,
          'p-button-outlined': outlined,
          'p-button-text': text,
          'p-button-sm': sm,
          'p-button-lg': lg,
          'w-100': block,
          'float-end': floatEnd,
          'float-none': floatNone,
          'float-start': floatStart,

          'float-sm-end': floatSmEnd,
          'float-sm-none': floatSmNone,
          'float-sm-start': floatSmStart,

          'float-md-end': floatMdEnd,
          'float-md-none': floatMdNone,
          'float-md-start': floatMdStart,

          'float-lg-end': floatLgEnd,
          'float-lg-none': floatLgNone,
          'float-lg-start': floatLgStart,

          'float-xl-end': floatXlEnd,
          'float-xl-none': floatXlNone,
          'float-xl-start': floatXlStart,

          'float-xxl-end': floatXxlEnd,
          'float-xxl-none': floatXxlNone,
          'float-xxl-start': floatXxlStart,
        })}
        {...rest}
      >
        {props.children}
      </Button>
    </React.Fragment>
  );
};

export default BaseButton;
