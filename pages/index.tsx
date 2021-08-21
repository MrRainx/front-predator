import PrivateLayout from '@layouts/PrivateLayout';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <PrivateLayout hideNavbar head={{ title: 'Inicio' }}>
      <div className="container">
        <h1 className="display-6 text-center"> Bienvenido</h1>
        <div className="row">
          <div className="col-md-6 text-center">
            <h1>Mis proyectos</h1>
          </div>
          <div className="col-md-6 text-center">
            <h1>Mis proyectos</h1>
          </div>
        </div>
      </div>
    </PrivateLayout>
  );
};

export default Home;
