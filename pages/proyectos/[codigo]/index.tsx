import { useQuery } from '@apollo/client';
import { getProyectoByUsuarioAndCodigo } from '@graphql/Proyectos/queries.gql';
import PrivateLayout from '@layouts/PrivateLayout';
import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';

const ProyectoPage: NextPage<{ codigo?: string }> = ({ codigo }) => {
  const { data } = useQuery(getProyectoByUsuarioAndCodigo, {
    variables: {
      codigo,
    },
  });

  const proyecto = data?.proyecto;

  return (
    <PrivateLayout
      head={{
        proyecto: proyecto?.titulo,
      }}
    >
      <main className="container-fluid">
        <div className="surface-0 text-center mt-6">
          <div className="mb-3 font-bold text-2xl">
            <span className="text-900 display-6">{proyecto?.titulo}</span>
          </div>
          <div className="text-700 text-sm mb-6">{proyecto?.descripcion}</div>
          <div className="grid">
            <Link href="/" passHref>
              <div className="col-12 md:col-4 mb-4 px-5 cursor-pointer">
                <span
                  className="p-3 shadow-2 mb-3 inline-block"
                  style={{ borderRadius: '10px' }}
                >
                  <i className="pi pi-users text-4xl text-blue-500"></i>
                </span>
                <div className="text-900 mb-3 font-medium">Integrantes</div>
                <span className="text-700 text-sm line-height-3">
                  Consulta los integrantes de tu proyecto
                </span>
              </div>
            </Link>

            <div className="col-12 md:col-4 mb-4 px-5">
              <span
                className="p-3 shadow-2 mb-3 inline-block"
                style={{ borderRadius: '10px' }}
              >
                <i className="pi pi-lock text-4xl text-blue-500"></i>
              </span>
              <div className="text-900 mb-3 font-medium">
                End-to-End Encryption
              </div>
              <span className="text-700 text-sm line-height-3">
                Risus nec feugiat in fermentum posuere urna nec. Posuere
                sollicitudin aliquam ultrices sagittis.
              </span>
            </div>

            <div className="col-12 md:col-4 mb-4 px-5">
              <span
                className="p-3 shadow-2 mb-3 inline-block"
                style={{ borderRadius: '10px' }}
              >
                <i className="pi pi-check-circle text-4xl text-blue-500"></i>
              </span>
              <div className="text-900 mb-3 font-medium">Easy to Use</div>
              <span className="text-700 text-sm line-height-3">
                Ornare suspendisse sed nisi lacus sed viverra tellus. Neque
                volutpat ac tincidunt vitae semper.
              </span>
            </div>

            <div className="col-12 md:col-4 mb-4 px-5">
              <span
                className="p-3 shadow-2 mb-3 inline-block"
                style={{ borderRadius: '10px' }}
              >
                <i className="pi pi-globe text-4xl text-blue-500"></i>
              </span>
              <div className="text-900 mb-3 font-medium">
                Fast & Global Support
              </div>
              <span className="text-700 text-sm line-height-3">
                Fermentum et sollicitudin ac orci phasellus egestas tellus
                rutrum tellus.
              </span>
            </div>

            <div className="col-12 md:col-4 mb-4 px-5">
              <span
                className="p-3 shadow-2 mb-3 inline-block"
                style={{ borderRadius: '10px' }}
              >
                <i className="pi pi-github text-4xl text-blue-500"></i>
              </span>
              <div className="text-900 mb-3 font-medium">Open Source</div>
              <span className="text-700 text-sm line-height-3">
                Nec tincidunt praesent semper feugiat. Sed adipiscing diam donec
                adipiscing tristique risus nec feugiat.{' '}
              </span>
            </div>

            <div className="col-12 md:col-4 md:mb-4 mb-0 px-3">
              <span
                className="p-3 shadow-2 mb-3 inline-block"
                style={{ borderRadius: '10px' }}
              >
                <i className="pi pi-shield text-4xl text-blue-500"></i>
              </span>
              <div className="text-900 mb-3 font-medium">Trusted Securitty</div>
              <span className="text-700 text-sm line-height-3">
                Mattis rhoncus urna neque viverra justo nec ultrices. Id cursus
                metus aliquam eleifend.
              </span>
            </div>
          </div>
        </div>
      </main>
    </PrivateLayout>
  );
};

ProyectoPage.getInitialProps = ({ query }) => query;

export default ProyectoPage;
