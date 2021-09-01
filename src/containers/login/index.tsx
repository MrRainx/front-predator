import Form from '@components/Form';
import global from '@constants/global';
import useAxios from '@hooks/useAxios';
import useCustomForm from '@hooks/useCustomForm';
import useToasts from '@hooks/useToasts';
import { setItem } from '@utils/storage';
import { useRouter } from 'next/dist/client/router';
import { Button } from 'primereact/button';
import React from 'react';
import { FormProvider } from 'react-hook-form';
import { useMutation } from 'react-query';
import HttpResponses from 'src/enums/HttpResponses';
import { getTokenUrl } from 'src/services/urls';

const LoginContainer = () => {
  const { publicApi } = useAxios();
  const { addWarningToast } = useToasts();
  const methods = useCustomForm({ mode: 'onChange' });

  const router = useRouter();

  const mutation = useMutation((formData) =>
    publicApi.post(getTokenUrl, formData),
  );

  const onSubmit = async (formData) => {
    try {
      const { data, status } = await mutation.mutateAsync(formData);

      if (status === HttpResponses.HTTP_200_OK) {
        global.setTokens(data?.access, data?.refresh);
        router.replace('/');
      }
    } catch (error) {
      methods.setErrorsApi(error);
      if (error?.response?.data?.detail) {
        addWarningToast(error?.response?.data?.detail);
      }
    }
  };
  return (
    <div className="container-grid vh-100 align-items-center overflow-hidden">
      <div className="grid justify-content-center">
        <div className="col-11 md:col-8 xl:col-6">
          <div className="card border-primary">
            <div className="card-header bg-primary text-white text-center">
              <h3>Ingresar</h3>
            </div>
            <FormProvider {...methods}>
              <div className="card-body">
                <Form.FieldWrapper name="username" label="Username:">
                  <Form.ControlledWrapper
                    rules={{ required: 'Este campo es obligatorio' }}
                    defaultValue=""
                  >
                    <Form.TextInput changers={['trim']} />
                    <Form.ErrorMessage />
                  </Form.ControlledWrapper>
                  <Form.ErrorMessage />
                </Form.FieldWrapper>

                <Form.FieldWrapper name="password" label="Password:">
                  <Form.ControlledWrapper
                    rules={{ required: 'Este campo es obligatorio' }}
                    defaultValue=""
                  >
                    <Form.Password
                      toggleMask
                      feedback={false}
                      changers={['trim']}
                    />
                  </Form.ControlledWrapper>
                  <Form.ErrorMessage />
                </Form.FieldWrapper>
                <div className="text-center">
                  <Button
                    label="Ingresar"
                    //   variant="info"
                    onClick={methods.handleSubmit(onSubmit)}
                    loading={mutation.isLoading}
                  />
                </div>
              </div>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;
