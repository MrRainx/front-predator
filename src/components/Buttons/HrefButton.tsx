import { useRouter } from 'next/dist/client/router';
import React, { PropsWithChildren } from 'react';
import { UrlObject } from 'url';
import BaseButton, { BaseButtonProps } from './BaseButton';

export interface HrefButtonProps extends PropsWithChildren<BaseButtonProps> {
  href?: UrlObject | string;
}

export const initialState: HrefButtonProps = {
  type: 'button',
};

const HrefButton: React.FC<HrefButtonProps> = (props) => {
  const router = useRouter();
  const { href, ...rest } = props;
  const onClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    props.onClick && props.onClick(evt);
    if (href) {
      router.push(href);
    }
  };

  return (
    <BaseButton {...rest} onClick={onClick}>
      {props.children}
    </BaseButton>
  );
};

HrefButton.defaultProps = initialState;

export default HrefButton;
