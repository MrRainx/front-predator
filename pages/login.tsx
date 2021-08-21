import PublicLayout from '@layouts/PublicLayout';
import { NextPage } from 'next';
import React from 'react';
import BaseButton from 'mr-commons/dist/lib/esm/components/Buttons/BaseButton';

const LoginPage: NextPage = () => {
  return (
    <PublicLayout head={{ title: 'Login' }}>
      <div className="container-grid vh-100 align-items-center">
        <div className="d-flex flex-row justify-content-center">
          <div className="col-11 col-md-8 col-xl-6">
            <div className="card border-primary">
              <div className="card-header bg-primary text-white text-center">
                <h3>Ingresar</h3>
              </div>
              <div className="card-body">
                <Form.FieldWrapper name="username" label="Username:">
                  <Form.TextInput />
                </Form.FieldWrapper>

                <Form.FieldWrapper name="password" label="Password:">
                  <Form.TextInput />
                </Form.FieldWrapper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default LoginPage;
