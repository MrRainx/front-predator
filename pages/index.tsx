import PrivateLayout from '@layouts/PrivateLayout';
import type { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { ListBox } from 'primereact/listbox';
import { useUsuario } from 'src/state/usuario.store';

const Home: NextPage = () => {
  const { username, proyectosParticipo } = useUsuario();

  const router = useRouter();

  return (
    <PrivateLayout head={{ title: 'Inicio' }}>
      <div className="container">
        <h1 className="display-6 text-center my-5">
          Bienvenido &lsquo;{username}&rsquo;
        </h1>
        <div className="grid justify-content-center mt-5">
          <div className="md:col-6 xl:col-4 text-center">
            <h4 className="my-4">Proyecto en los que participas</h4>
            <ListBox
              filter
              filterMatchMode="contains"
              className="p-inputtext-sm"
              options={proyectosParticipo}
              optionLabel="proyecto.titulo"
              filterPlaceholder="Buscar..."
              onChange={({ value }) => {
                router.push(`/proyecto/${value?.proyecto?.codigo}`);
              }}
              itemTemplate={(value) => {
                return (
                  <Link href={`/proyecto/${value?.proyecto?.codigo}`}>
                    {value.proyecto?.titulo}
                  </Link>
                );
              }}
            />
          </div>
          <div className="md:col-6 xl:col-4 text-center">
            <h4 className="my-4">Mis proyectos</h4>
            <ListBox
              filter
              filterMatchMode="contains"
              options={proyectosParticipo}
              optionLabel="proyecto.titulo"
              filterPlaceholder="Buscar..."
              onChange={({ value }) => {
                router.push(`/proyecto/${value?.proyecto?.codigo}`);
              }}
              className="p-inputtext-sm"
              itemTemplate={(value) => {
                return (
                  <Link href={`/proyecto/${value?.proyecto?.codigo}`}>
                    {value.proyecto?.titulo}
                  </Link>
                );
              }}
            />
          </div>
        </div>
      </div>
    </PrivateLayout>
  );
};

export default Home;
