import { RegisterOptions } from 'react-hook-form';

export interface BaseFormFieldProps {
  name: string;
  label: string;
  rules?: RegisterOptions;
}
