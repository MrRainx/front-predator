/* eslint-disable react-hooks/exhaustive-deps */
import PublicLayout from '@layouts/PublicLayout';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect } from 'react';
import { useUsuario } from 'src/state/usuario.store';

const LogOutPage = () => {
  const usuario = useUsuario();
  const router = useRouter();

  useEffect(() => {
    usuario.logout();
    router.replace('/login');
  }, []);

  return (
    <PublicLayout loading={{ isLoading: true }}>
      <main></main>
    </PublicLayout>
  );
};

export default LogOutPage;
