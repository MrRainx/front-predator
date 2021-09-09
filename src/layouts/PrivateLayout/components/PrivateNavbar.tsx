import { useQuery } from '@apollo/client';
import { getMisInvitaciones } from '@graphql/Proyectos/queries.gql';
import ProyectoRouter from '@routes/proyectos.routes';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { PrimeIcons } from 'primereact/api';
import { Menubar } from 'primereact/menubar';
import { OverlayPanel } from 'primereact/overlaypanel';
import React, { useMemo, useRef } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useUsuario } from 'src/state/usuario.store';
import Notifications from './Notifications';

const Component = (props, ref) => {
  const { id, username, email } = useUsuario();
  const op = useRef(null);
  const router = useRouter();

  const { data } = useQuery(getMisInvitaciones, {
    // pollInterval: 5000,
  });
  const misInvitaciones = data?.misInvitaciones;

  const command = (path) => () => {
    router.push(path);
  };

  const handleLogout = () => {
    router.push('/logout');
  };

  const end = useMemo(() => {
    if (typeof window?.document === 'undefined') {
      return null;
    }

    return (
      <React.Fragment>
        <Notifications notificaciones={misInvitaciones} />

        {id && (
          <button
            style={{
              color: 'white',
              background: 'none',
              border: 'none',
              outline: 'none',
            }}
            onClick={(e) => op?.current?.toggle?.(e)}
          >
            <span className="me-2">{username}</span>
            <i className="pi pi-user cpointer text-white" />
          </button>
        )}

        <OverlayPanel ref={op} style={{ width: '300px' }}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 text-center">
                {/* <img
                  className="img-fluid img-thumbnail"
                  style={{ maxHeight: '100px' }}
                  src={usuario?.persona?.foto}
                  alt=""
                /> */}
                <h5 className="mt-2">{username}</h5>
                <h6 className="mt-2">{email}</h6>
              </div>
            </div>
          </div>
          <ListGroup className="nav__user__menu">
            <Link href="/perfil" passHref>
              <button>
                <i className={PrimeIcons.USER} /> Mi Perfil
              </button>
            </Link>

            <button onClick={handleLogout}>
              <i className={PrimeIcons.POWER_OFF} /> Salir
            </button>
          </ListGroup>
        </OverlayPanel>
      </React.Fragment>
    );
  }, [misInvitaciones, id, username, email, handleLogout]);

  return (
    <header ref={ref}>
      <Menubar
        className="shadow disable-left-button"
        model={[
          {
            label: 'Dashboard',
            command: command('/'),
          },
          {
            label: 'Proyectos',
            items: [
              {
                label: 'Mis proyectos',
                icon: PrimeIcons.LIST,
                command: command(ProyectoRouter.listado),
              },
              {
                label: 'Crear nuevo proyecto',
                icon: PrimeIcons.PLUS,
                command: command(ProyectoRouter.add),
              },
              {
                separator: true,
              },
              {
                label: 'Proyectos en los que participo',
                icon: PrimeIcons.LIST,
              },
            ],
          },
        ]}
        end={(e) => end}
      />
    </header>
  );
};
Component.displayName = 'PrivateNavbar';

const PrivateNabvar = React.forwardRef(Component);

export default PrivateNabvar;
