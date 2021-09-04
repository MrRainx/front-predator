/* eslint-disable react-hooks/exhaustive-deps */
import { ErrorMessage } from '@hookform/error-message';
import classNames from 'classnames';
import _ from 'lodash';
import { PrimeIcons } from 'primereact/api';
import { Message } from 'primereact/message';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

export interface NonFieldErrorsProps extends PropsWithChildren<any> {
  name?: string;
}

const NonFieldErrors: React.FC<NonFieldErrorsProps> = (props) => {
  const { formState } = useFormContext();

  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    const hasError = _.get(formState.errors, props.name, false);
    setShowErrors(hasError);
  }, [formState.submitCount, formState.errors, formState.isSubmitSuccessful]);

  return (
    <ErrorMessage
      name={props.name}
      render={({ message }) => (
        <React.Fragment>
          {showErrors && (
            <Message
              severity="error"
              content={
                <small className="p-error text-base w-100 mx-2">
                  {message}
                  <i
                    className={classNames(
                      PrimeIcons.TIMES_CIRCLE,
                      'ml-3 cursor-pointer text-base',
                    )}
                    onClick={() => setShowErrors(false)}
                  />
                </small>
              }
            />
          )}
        </React.Fragment>
      )}
    />
  );
};

NonFieldErrors.defaultProps = {
  name: 'nonFieldErrors',
};

export default NonFieldErrors;
