import BaseButton from '@components/Buttons/BaseButton';
import HrefButton from '@components/Buttons/HrefButton';
import useAxios from '@hooks/useAxios';
import useCustomForm from '@hooks/useCustomForm';
import ProyectoRouter from '@routes/proyectos.routes';
import { useRouter } from 'next/router';
import React from 'react';
import { FormProvider } from 'react-hook-form';
import { useMutation } from 'react-query';
import HttpResponses from 'src/enums/HttpResponses';
import { createProyectoUrl } from 'src/services/urls';
import FormProyectoContainer from './form';

const AddProyectoContainer = () => {
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

  const router = useRouter();

  const mutation = useMutation((formData) =>
    privateApi.post(createProyectoUrl, formData),
  );

  const onSubmit = async (formData) => {
    try {
      const { data, status } = await mutation.mutateAsync(formData);
      if (status === HttpResponses.HTTP_201_CREATED) {
        console.log(data);
        const route = ProyectoRouter.update(data?.id);
        router.replace(route);
      }
    } catch (error) {
      methods.setErrorsApi(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className="grid border-900"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <FormProyectoContainer />
        <div className="col-12 card pt-4 pb-3 px-4 md:mt-4">
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
  );
};

export default AddProyectoContainer;
