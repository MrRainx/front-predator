import Router from '@routes/proyectos.routes';
import classNames from 'classnames';
import Link from 'next/link';
import { PrimeIcons } from 'primereact/api';
import { Badge } from 'primereact/badge';
import { Sidebar } from 'primereact/sidebar';
import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';

const Notifications = ({ notificaciones }) => {
  const [showSideBar, setShowSideBar] = useState(false);

  const onClick = (estado) => () => {
    setShowSideBar(estado);
  };

  return (
    <React.Fragment>
      <button
        className={classNames(
          PrimeIcons.BELL,
          'p-overlay-badge',
          'cursor-pointer',
          'me-3',
        )}
        style={{
          fontSize: '1rem',
          color: 'white',
          background: 'none',
          outline: 'none',
          border: 'none',
        }}
        onClick={onClick(true)}
      >
        {notificaciones?.length > 0 && (
          <Badge size="normal" value={notificaciones?.length} />
        )}
      </button>
      <Sidebar visible={showSideBar} position="right" onHide={onClick(false)}>
        <Link href={Router.misInvitaciones} passHref>
          <h5 className="text-center underline link-success cursor-pointer">
            Invitaciones a proyectos
          </h5>
        </Link>
        {notificaciones?.map?.((invite) => (
          <ListGroup className="nav__user__menu border" key={invite.id}>
            <Link href={Router.invitacionProyecto(invite.id)} passHref>
              <button>
                <i className={PrimeIcons.USER} /> {invite.proyecto.titulo}
              </button>
            </Link>
          </ListGroup>
        ))}
      </Sidebar>
    </React.Fragment>
  );
};

export default Notifications;
