import HrefButton from '@components/Buttons/HrefButton';
import { PrimeIcons } from 'primereact/api';
import React, { PropsWithChildren } from 'react';

export interface FooterButtonProps extends PropsWithChildren<any> {
  backHref: string;
  backLabel?: string;
  backIsLoading: boolean;
  backIsDisabled?: boolean;

  nextHref: string;
  nextLabel: string;
  nextIsLoading: boolean;
  nextIsDisabled?: boolean;
}

const FooterButtons: React.FC<FooterButtonProps> = (props) => {
  return (
    <div className="col-12 card pt-4 pb-3 px-4 md:mt-4">
      <div className="grid justify-content-around">
        <HrefButton
          outlined
          className="col-12 md:col-3 my-1"
          href={props?.backHref}
          variant="info"
          label={props?.backLabel}
          loading={props?.backIsLoading}
          disabled={props?.backIsDisabled}
          icon={PrimeIcons.ARROW_LEFT}
        />
        <HrefButton
          outlined
          className="col-12 md:col-3 my-1"
          label={props.nextLabel}
          href={props.nextHref}
          disabled={props?.nextIsDisabled}
          loading={props?.nextIsLoading}
          icon={PrimeIcons.ARROW_RIGHT}
          iconPos="right"
        />
      </div>
    </div>
  );
};

export default FooterButtons;
