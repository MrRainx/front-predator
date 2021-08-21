import { isArray } from 'lodash';
import React from 'react';
import BreadCrumbItem, {
  BreadCrumbItemProps
} from './components/BreadCrumbItem';

export interface BreadCrumbProps {
  basePath?: string;
  baseTitle?: string;
  items?: (BreadCrumbItemProps | string[] | string)[];
}

export const initialProps: BreadCrumbProps = {
  basePath: '/',
  baseTitle: 'Inicio',
  items: [],
};

const getItem = (item: any, position: 0 | 1, attribute: 'title' | 'href') => {
  if (typeof item === 'string') {
    return item;
  } else if (isArray(item)) {
    return item[position];
  }
  return item[attribute];
};
const mappItem = (item: any): BreadCrumbItemProps => {
  const title = getItem(item, 0, 'title');
  const href = getItem(item, 1, 'href');
  return {
    title: title,
    active: Boolean(href) === true,
    href: href,
  };
};

const BreadCrumb: React.FC<BreadCrumbProps> = (props) => {
  return (
    <nav aria-label="breadcrumb" className="text-center text-md-right">
      <ol>
        <BreadCrumbItem
          title={String(props.baseTitle || initialProps.baseTitle)}
          href={props.basePath || initialProps.basePath}
        />
        {props.items?.map?.((item, index) => (
          <BreadCrumbItem key={index} {...mappItem(item)} />
        ))}
      </ol>
    </nav>
  );
};

export default BreadCrumb;
