import React from 'react';
import BreadCrumb, { BreadCrumbProps } from '..';

export interface HeadBreadCrumbProps extends BreadCrumbProps {
  title?: string;
}

const HeadBreadCrumb: React.FC<HeadBreadCrumbProps> = (props) => {
  return (
    <div className="d-flex flex-column flex-sm-row justify-content-sm-between my-5 mx-sm-2 mx-md-4">
      <h3 className="align-self-center">{props.title}</h3>
      <div className="align-self-center">
        <BreadCrumb {...props} />
      </div>
    </div>
  );
};

export default HeadBreadCrumb;
