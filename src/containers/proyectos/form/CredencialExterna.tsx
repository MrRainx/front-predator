import { useQuery } from '@apollo/client';
import HrefButton from '@components/Buttons/HrefButton';
import { getCredencialExterna } from '@graphql/Proyectos/queries.gql';
import { PrimeIcons } from 'primereact/api';
import React, { useState } from 'react';
import { Pk } from 'src/services/Base.service';
import { ICredencialExterna } from 'src/services/credenciales.services';

const test = `
fetch(
    'http://localhost:7500/proyectos/form/credencial-externa?id=15&credencial=9',
    {
      method: 'POST',
      headers: {
        Authorization: 'JWT ',
        'Content-type': 'application-json',
      },
      body: JSON.stringify({
        identificador: '133112312123312',
        paso: 'informacionCliente',
        payload: {
          primerNombre: 'Prueba',
          primerApellido: 'Prueba dos',
        },
      }),
    },
  );
`;
const CredencialExternaContainer: React.FC<{ id: Pk }> = ({ id }) => {
  const { loading, data } = useQuery<{ credencial: ICredencialExterna }>(
    getCredencialExterna,
    {
      variables: { pk: id },
    },
  );

  const [showToken, setShowToken] = useState(false);

  const credencial = data?.credencial;
  const isLoading = loading;

  return (
    <main className="container">
      <div className="col-12">
        <h3 className="text-center">{credencial?.nombre}</h3>
        <p>{credencial?.descripcion}</p>
        <label htmlFor="">Token de acceso:</label>
        <div className="bg-gray-300">
          <HrefButton
            icon={PrimeIcons.COPY}
            text
            outlined
            rounded
            floatEnd
            clipBoardText={credencial?.jwtToken}
            tooltip="Copiar token"
          />
          <HrefButton
            icon={showToken ? PrimeIcons.EYE_SLASH : PrimeIcons.EYE}
            text
            outlined
            rounded
            floatEnd
            tooltip={showToken ? 'Ocultar token' : 'Ver token'}
            onClick={() => setShowToken(!showToken)}
          />
          <div className="p-3">
            {showToken && (
              <code className="font-bold">{credencial?.jwtToken}</code>
            )}
            {!showToken && (
              <div className="text-center">
                <HrefButton
                  label="Ver token"
                  icon={PrimeIcons.EYE}
                  text
                  className="text-center"
                  tooltip="Ver token"
                  onClick={() => setShowToken(true)}
                />
              </div>
            )}
          </div>
        </div>

        <label htmlFor="" className="mt-3">
          Endpoint:
        </label>
        <div className="bg-gray-300">
          <div className="p-3 d-flex justify-content-between">
            <code className="align-self-center font-bold">
              http://localhost:7500/proyectos/form/credencial-externa?id=15&credencial=9
            </code>
            <HrefButton
              icon={PrimeIcons.COPY}
              className="align-self-center"
              text
              outlined
              rounded
              clipBoardText={credencial?.jwtToken}
              tooltip="Copiar token"
            />
          </div>
        </div>

        <label htmlFor="" className="mt-3">
          Ejemplo:
        </label>
        <div className="bg-gray-300">
          <div className="p-3 d-flex justify-content-between">
            <code className="align-self-center font-bold">{test}</code>
            <HrefButton
              icon={PrimeIcons.COPY}
              className="align-self-center"
              text
              outlined
              rounded
              clipBoardText={credencial?.jwtToken}
              tooltip="Copiar token"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default CredencialExternaContainer;
