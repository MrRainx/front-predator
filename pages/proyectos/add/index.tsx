import BaseButton from '@components/Buttons/BaseButton';
import HrefButton from '@components/Buttons/HrefButton';
import Form from '@components/Form';
import ImageSelector from '@components/Form/ImageSelector';
import useAxios from '@hooks/useAxios';
import useCustomForm from '@hooks/useCustomForm';
import PrivateLayout from '@layouts/PrivateLayout';
import React from 'react';
import { Controller, FormProvider } from 'react-hook-form';
import { useMutation } from 'react-query';
import HttpResponses from 'src/enums/HttpResponses';
import { createProyecto } from 'src/services/urls';

const AddProyectoPage = () => {
  const methods = useCustomForm({
    mode: 'onChange',
    defaultValues: {
      logo: undefined,
      titulo: 'CUPO SEGURO',
      codigo: 'cupoSeguro',
      descripcion: null,
      categoria: 2,
    },
  });

  const { privateApi } = useAxios();

  const mutation = useMutation((formData) =>
    privateApi.post(createProyecto, formData),
  );

  const onSubmit = async (formData) => {
    console.log(formData);
    try {
      const { data, status } = await mutation.mutateAsync(formData);
      if (status === HttpResponses.HTTP_201_CREATED) {
        console.log(data);
      }
    } catch (error) {
      methods.setErrorsApi(error);
    }
  };

  return (
    <PrivateLayout
      head={{
        proyecto: 'Predator',
        title: 'Nuevo proyecto',
      }}
      breadCrumb={{
        title: 'Agregar proyecto',
        items: ['Nuevo'],
      }}
    >
      <main className="container">
        <FormProvider {...methods}>
          <form
            className="grid border-900"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <div className="col-12 md:col-6 lg:col-5">
              <Controller
                name="logo"
                render={({ field }) => (
                  <React.Fragment>
                    <label className="text-900 text-center w-100">Logo:</label>
                    <ImageSelector {...field} />
                  </React.Fragment>
                )}
              />
            </div>

            <div className="col-12 md:col-6 lg:col-7 align-items-center">
              <Form.FieldWrapper
                className="col-12"
                name="titulo"
                label="Título del proyecto"
              >
                <Form.ControlledWrapper
                  rules={{ required: 'Este campo es obligatorio' }}
                >
                  <Form.TextInput />
                </Form.ControlledWrapper>
                <Form.ErrorMessage />
              </Form.FieldWrapper>

              <Form.FieldWrapper
                name="codigo"
                label="Código"
                className="col-12"
              >
                <Form.ControlledWrapper
                  rules={{ required: 'Esate campo es obligatorio' }}
                >
                  <Form.TextInput />
                </Form.ControlledWrapper>
                <Form.ErrorMessage />
              </Form.FieldWrapper>

              <Form.FieldWrapper
                name="descripcion"
                label="Descripción"
                className="col-12"
              >
                <Form.ControlledWrapper>
                  <Form.TextArea />
                </Form.ControlledWrapper>
              </Form.FieldWrapper>

              <Form.FieldWrapper
                name="categoria"
                label="Categoria"
                className="col-12"
              >
                <Form.ControlledWrapper
                  rules={{ required: 'Este campo es obligatorio' }}
                >
                  <Form.Select options={[{ label: 'CAMPAÑA', value: 2 }]} />
                </Form.ControlledWrapper>
                <Form.ErrorMessage />
              </Form.FieldWrapper>
            </div>

            <div className="col-12 card pt-4 pb-3 px-4 md:mt-7">
              <div className="grid justify-content-around">
                <HrefButton
                  className="col-12 md:col-3 my-1"
                  href="/"
                  variant="danger"
                  label="Regresar"
                />
                <BaseButton
                  className="col-12 md:col-3 my-1"
                  label="Guardar y continuar"
                />
              </div>
            </div>
          </form>
        </FormProvider>
      </main>
    </PrivateLayout>
  );
};

export default AddProyectoPage;
