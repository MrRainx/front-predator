/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from '@apollo/client';
import { getProyectoById } from '@graphql/Proyectos/queries.gql';
import useAxios from '@hooks/useAxios';
import useCustomForm from '@hooks/useCustomForm';
import { useLayoutActions } from '@layouts/layout.store';
import Router from '@routes/proyectos.routes';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { FormProvider } from 'react-hook-form';
import { useMutation } from 'react-query';
import HttpResponses from 'src/enums/HttpResponses';
import { updateProyectoUrl } from 'src/services/urls';
import FooterButtons from './components/FooterButtons';
import FormProyectoContainer from './form';

const UpdateProyectoContainer = ({ id }) => {
  const methods = useCustomForm({
    mode: 'onChange',
  });

  const { setLayout, resetLayoutState } = useLayoutActions();

  const { loading, data } = useQuery(getProyectoById, {
    variables: {
      pk: id,
    },
    onCompleted: ({ proyecto }) => {
      methods.reset({
        ...proyecto,
        categoria: +proyecto?.categoria?.id,
      });
    },
  });

  const { privateApi } = useAxios();

  const router = useRouter();

  const mutation = useMutation((formData) =>
    privateApi.put(updateProyectoUrl(id), formData),
  );

  useEffect(() => {
    setLayout({
      head: {
        title: data?.proyecto?.titulo,
      },
      breadCrumb: {
        title: 'Editar Proyecto',

        items: [[data?.proyecto?.titulo]],
      },
    });
  }, [loading]);

  const onSubmit = async (formData) => {
    try {
      const { data, status } = await mutation.mutateAsync(formData);
      if (status === HttpResponses.HTTP_200_OK) {
        console.log(data);
        const route = Router.configEstados(data?.id);
        router.push(route);
        return resetLayoutState();
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

        <FooterButtons
          backHref={Router.listado}
          backIsLoading={loading}
          backLabel="Regresar"
          nextIsLoading={loading}
          nextLabel="Config. estados"
        />
      </form>
    </FormProvider>
  );
};

export default UpdateProyectoContainer;
