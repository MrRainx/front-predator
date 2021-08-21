import classNames from 'classnames';
import Head from 'next/head';
import React, { useMemo } from 'react';

export interface HtmlHeadProps {
  proyecto?: string;
  title?: string;
}

const HtmlHead: React.FC<HtmlHeadProps> = (props) => {
  const title = useMemo(() => {
    return classNames({
      [props?.proyecto]: props?.proyecto,
      '|': props?.proyecto && props?.title,
      [props?.title]: props?.title,
    });
  }, [props]);
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
    </Head>
  );
};

export default HtmlHead;
