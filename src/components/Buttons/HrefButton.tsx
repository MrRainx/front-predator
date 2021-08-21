import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { UrlObject } from 'url';
import BaseButton, { BaseButtonProps } from './BaseButton';

export interface HrefButtonProps extends BaseButtonProps {
  href: UrlObject | string;
}

const HrefButton: React.FC<HrefButtonProps> = (props) => {
  const router = useRouter();
  const onClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    props.onClick && props.onClick(evt);
    router.push(props.href);
  };
  return <BaseButton {...props} onClick={onClick} />;
};

export default HrefButton;
