import LoginContainer from '@containers/login';
import PublicLayout from '@layouts/PublicLayout';
import { NextPage } from 'next';
import React from 'react';

const LoginPage: NextPage = () => {
  return (
    <PublicLayout head={{ title: 'Login' }}>
      <LoginContainer />
    </PublicLayout>
  );
};

export default LoginPage;
