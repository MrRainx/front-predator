import axios from 'axios';

export const setErrorsApi = (errors, setter) => {
  if (axios.isAxiosError(errors)) {
    try {
      Object.entries(errors.response.data).forEach(([key, value]) => {
        if (key !== 'nonFieldErrors') {
          setter(key, {
            message: value[0],
            type: 'custom',
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
};
