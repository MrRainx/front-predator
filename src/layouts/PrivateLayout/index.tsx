import { useQuery } from '@apollo/client';
import HtmlHead from '@components/HtmlHead';
import Loading from '@components/Loading';
import { me } from '@graphql/auth/queries.gql';
import { BaseLayoutProps } from '@layouts/typedefs';
import { useRouter } from 'next/dist/client/router';
import { ScrollTop } from 'primereact/scrolltop';
import React, { useRef } from 'react';
import { useUsuario } from 'src/state/usuario.store';
import PrivateNabvar from './components/PrivateNavbar';

export interface PrivateLayoutProps extends BaseLayoutProps {
  breadCrumb?: {};
  hideNavbar?: boolean;
  privateNavbar?: boolean;
  publicNavbar?: boolean;
}
const initialState: PrivateLayoutProps = {
  hideNavbar: false,
  privateNavbar: true,
  publicNavbar: false,
};

const PrivateLayout: React.FC<PrivateLayoutProps> = (props = initialState) => {
  const ref = useRef(null);
  const containerRef = useRef(null);

  const router = useRouter();

  const { setUsuario } = useUsuario();

  const { loading } = useQuery(me, {
    onCompleted: ({ myInfo }) => {
      if (!myInfo) {
        return router.replace('/login');
      }
      setUsuario(myInfo);
    },
  });

  return (
    <React.Fragment>
      <HtmlHead {...props?.head} />
      <main className="d-flex flex-row vh-100 w-100">
        <div className="d-flex flex-column w-100">
          {!props.hideNavbar && <PrivateNabvar ref={ref} />}
          <Loading
            {...props?.loading}
            isLoading={props?.loading?.isLoading || loading}
          >
            <div
              style={{
                overflowY: 'auto',
                height: `calc(100% - ${ref?.current?.offsetHeight}px)`,
                scrollBehavior: 'smooth',
              }}
              ref={containerRef}
            >
              {props?.children}
              <ScrollTop
                target="parent"
                threshold={400}
                className="p-button-info"
                icon="pi pi-arrow-up"
              />
            </div>
          </Loading>
        </div>
      </main>
    </React.Fragment>
  );
};

export default PrivateLayout;
