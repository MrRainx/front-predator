/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import React from 'react';

export interface BreadCrumbItemProps {
  title: string;
  href?: string;
  active?: boolean;
}

const BreadCrumbItem: React.FC<BreadCrumbItemProps> = (props) => {
  return (
    <li className="d-inline breadcrumb-item active">
      {!props?.href && (
        <a className="font-weight-bold text-secondary text-decoration-none cpointer">
          {props.title}
        </a>
      )}
      {props?.href && (
        <Link href={props.href}>
          <a className="font-weight-bold cpointer">{props.title}</a>
        </Link>
      )}
    </li>
  );
};

export default BreadCrumbItem;
