import axios from 'axios';
import { useForm, UseFormProps } from 'react-hook-form';

const useCustomForm = (config?: UseFormProps) => {
  const methods = useForm(config);

  const setErrorsApi = (errors) => {
    if (axios.isAxiosError(errors)) {
      Object.entries(errors.response.data).forEach(([key, value]) => {
        methods.setError(key, {
          message: value[0],
          type: 'custom',
        });
      });
    }
  };

  return { ...methods, setErrorsApi };
};

export default useCustomForm;
