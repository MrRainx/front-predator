import { useQuery } from '@apollo/client';
import HrefButton from '@components/Buttons/HrefButton';
import Form from '@components/Form';
import BaseDataTable from '@components/Table/BaseDataTable';
import { IndexColumn } from '@components/Table/IndexColumn';
import { CSSProperties } from '@emotion/react/node_modules/@emotion/serialize';
import { getCredencialesByProyecto } from '@graphql/Proyectos/queries.gql';
import useWS from '@hooks/useWS';
import Router from '@routes/proyectos.routes';
import { PrimeIcons } from 'primereact/api';
import { Column } from 'primereact/column';
import { confirmPopup } from 'primereact/confirmpopup';
import { Dialog } from 'primereact/dialog';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Pk } from 'src/services/Base.service';
import {
  CredencialExternaWS,
  ICredencialExterna,
} from 'src/services/credenciales.services';
import FooterButtons from './components/FooterButtons';

const CredencialesExternasContainer: React.FC<{ id: Pk }> = ({ id }) => {
  const { loading, data, refetch } = useQuery(getCredencialesByProyecto, {
    variables: {
      proyectoId: id,
    },
    notifyOnNetworkStatusChange: true,
  });

  const [showDialog, setShowDialog] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const methods = useForm({ mode: 'onChange' });

  const ws = useWS<CredencialExternaWS>(CredencialExternaWS);

  const updateMutation = useMutation((instance: ICredencialExterna) =>
    ws.update(instance.id, instance),
  );
  const addMutation = useMutation((instance: ICredencialExterna) =>
    ws.create(instance),
  );
  const deleteMutation = useMutation((idInstance: Pk) => ws.delete(idInstance));

  const isLoading =
    loading ||
    updateMutation.isLoading ||
    addMutation.isLoading ||
    deleteMutation.isLoading;

  const onRecargar = () => {
    refetch();
  };

  const onSwitchCredencial = (rowData: ICredencialExterna) => {
    return async (checked: boolean) => {
      rowData.isActive = checked;
      rowData.proyecto = id;
      await updateMutation.mutateAsync(rowData);
      onRecargar();
    };
  };
  const onHide = () => {
    setShowDialog(false);
    setIsUpdate(false);
    methods.reset({});
  };

  const onSubmitCredencial = async (formData: ICredencialExterna) => {
    formData.proyecto = id;
    if (isUpdate) {
      await updateMutation.mutateAsync(formData);
    } else {
      await addMutation.mutateAsync(formData);
    }
    await refetch();
    onHide();
  };

  const onClickUpdate = (rowData: ICredencialExterna) => () => {
    methods.reset(rowData);
    setIsUpdate(true);
    setShowDialog(true);
  };

  const onConfirmDelete = (instance: ICredencialExterna) => async () => {
    await deleteMutation.mutateAsync(instance.id);
    await refetch();
  };

  const onClickDelete = (rowData: ICredencialExterna) => (event) => {
    confirmPopup({
      target: event.target,
      message: 'Esta seguro de eliminar esta credencial?',
      icon: PrimeIcons.EXCLAMATION_TRIANGLE,
      accept: onConfirmDelete(rowData),
      acceptLabel: 'SI',
      acceptClassName: 'p-button-danger',
      acceptIcon: PrimeIcons.TRASH,
      rejectIcon: PrimeIcons.TIMES,
    });
  };

  const renderFooter = () => {
    return (
      <React.Fragment>
        <HrefButton
          outlined
          variant="danger"
          label="Cancelar"
          icon={PrimeIcons.TIMES}
          onClick={onHide}
          loading={isLoading}
        />
        <HrefButton
          outlined
          label="Guardar"
          icon={PrimeIcons.SAVE}
          onClick={methods.handleSubmit(onSubmitCredencial)}
          loading={isLoading}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="col-12 d-flex flex-wrap justify-content-between">
      <HrefButton
        outlined
        sm
        icon={PrimeIcons.PLUS}
        label="Agregar"
        onClick={() => setShowDialog(true)}
        loading={isLoading}
      />
      <HrefButton
        outlined
        sm
        variant="info"
        icon={PrimeIcons.REFRESH}
        label="Recargar"
        onClick={onRecargar}
        loading={isLoading}
      />
    </div>
  );

  return (
    <main className="container-fluid container-lg">
      <BaseDataTable
        value={data?.credenciales}
        header={header}
        // loading={isLoading}
        rows={10}
        resizableColumns
      >
        {IndexColumn(null)}
        <Column
          header="Nombre"
          field="nombre"
          sortable
          bodyClassName="text-center"
        />
        <Column
          header="Código"
          field="codigo"
          sortable
          bodyClassName="text-center"
        />
        <Column
          header="Descripción"
          field="descripcion"
          sortable
          body={(rowData: ICredencialExterna) => (
            <p style={{ minWidth: '200px' }} className="m-0 p-0">
              {rowData.descripcion}
            </p>
          )}
        />
        <Column
          header="Estado"
          field="isActive"
          sortable
          style={{ width: '100px' } as CSSProperties}
          body={(rowData: ICredencialExterna) => (
            <div style={{ width: '100px' }}>
              <Form.SwitchButton
                value={rowData.isActive}
                onlabel="Activa"
                offlabel="Inactiva"
                size="sm"
                style="w-100"
                offstyle="dark"
                onChange={onSwitchCredencial(rowData)}
                disabled={isLoading}
              />
            </div>
          )}
        />
        <Column
          header="Opciones"
          style={{ width: '150px' }}
          body={(rowData: ICredencialExterna) => (
            <div
              className="d-flex flex-wrap justify-content-around"
              style={{ width: '150px' }}
            >
              <HrefButton
                icon={PrimeIcons.COG}
                variant="info"
                tooltip="Editar"
                sm
                outlined
                loading={isLoading}
                onClick={onClickUpdate(rowData)}
              />

              <HrefButton
                icon={PrimeIcons.TRASH}
                variant="danger"
                tooltip="Eliminar"
                sm
                outlined
                loading={isLoading}
                onClick={onClickDelete(rowData)}
              />
              <HrefButton
                icon={PrimeIcons.INFO_CIRCLE}
                variant="help"
                tooltip="Información"
                sm
                outlined
                href={Router.credencial(rowData.id)}
              />
            </div>
          )}
        />
      </BaseDataTable>

      <FormProvider {...methods}>
        <Dialog
          header="Formulario de configuración"
          visible={showDialog}
          className="w-100 sm:w-8 xl:w-5"
          footer={renderFooter()}
          onHide={onHide}
          maximizable
          draggable={false}
          closable={!isLoading}
        >
          {/* Nombre */}
          <Form.FieldWrapper name="nombre" label="Nombre">
            <Form.ControlledWrapper
              defaultValue=""
              rules={{ required: 'Este campo es obligatorio' }}
            >
              <Form.TextInput />
            </Form.ControlledWrapper>
            <Form.ErrorMessage />
          </Form.FieldWrapper>
          {/* Codigo */}
          <Form.FieldWrapper name="codigo" label="Código">
            <Form.ControlledWrapper
              defaultValue=""
              rules={{ required: 'Este campo es obligatorio' }}
            >
              <Form.TextInput />
            </Form.ControlledWrapper>
            <Form.ErrorMessage />
          </Form.FieldWrapper>
          {/* Descripcion */}
          <Form.FieldWrapper name="descripcion" label="Descripción">
            <Form.ControlledWrapper
              defaultValue=""
              rules={{ required: 'Este campo es obligatorio' }}
            >
              <Form.TextInput />
            </Form.ControlledWrapper>
            <Form.ErrorMessage />
          </Form.FieldWrapper>
          {/* Descripcion */}
          <Form.FieldWrapper name="isActive" label="Estado">
            <Form.ControlledWrapper defaultValue={true}>
              <Form.SwitchButton
                offlabel="Inactiva"
                onlabel="Activa"
                offstyle="dark"
                width={120}
              />
            </Form.ControlledWrapper>
            <Form.ErrorMessage />
          </Form.FieldWrapper>

          {/* FIN */}
        </Dialog>
      </FormProvider>

      <FooterButtons
        backIsLoading={updateMutation.isLoading || loading}
        backHref={Router.invitarPersonas(id)}
        backLabel="Invitar personas"
        nextIsLoading={updateMutation.isLoading || loading}
        nextHref={Router.listado}
        nextLabel="Listado de proyectos"
      />
    </main>
  );
};

export default CredencialesExternasContainer;
