import Form from '@components/Form';
import ImageSelector from '@components/Form/ImageSelector';
import React from 'react';
import { Controller } from 'react-hook-form';

const FormProyectoContainer = () => {
  return (
    <React.Fragment>
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

        <Form.FieldWrapper name="codigo" label="Código" className="col-12">
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

      <div className="col-12 text-center">
        <Form.NonFieldErrors />
      </div>
    </React.Fragment>
  );
};

export default FormProyectoContainer;
