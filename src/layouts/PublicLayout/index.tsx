import HtmlHead from '@components/HtmlHead';
import Loading from '@components/Loading';
import { BaseLayoutProps } from '@layouts/typedefs';
import React from 'react';

export interface PublicLayoutProps extends BaseLayoutProps {}

const PublicLayout: React.FC<PublicLayoutProps> = (props) => {
  return (
    <React.Fragment>
      <HtmlHead {...props?.head} />
      <main className="d-flex flex-row vh-100 w-100">
        <div className="d-flex flex-column w-100">
          <Loading {...props.loading}>{props.children}</Loading>
        </div>
      </main>
    </React.Fragment>
  );
};

export default PublicLayout;
