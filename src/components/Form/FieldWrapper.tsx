import classNames from 'classnames';
import React, { useMemo } from 'react';
import useName from './hooks/useName';

export interface FieldWrapperType {
  name: string;
  label?: string | any;
  className?: string;
}

const FieldWrapper: React.FC<FieldWrapperType> = ({
  children,
  name,
  label,
  className,
}) => {
  const htmlName = useName({ prefix: 'field_wrapper', name });
  const htmlLabelName = useName({ prefix: 'field_wrapper__label', name });

  const body = useMemo(() => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, { name });
      }
      return child;
    });
  }, [children, name]);

  const labelComponent = useMemo(() => {
    if (label) {
      return (
        <label
          className={classNames('w-100', 'label-form', htmlLabelName)}
          htmlFor={name}
          style={{
            cursor: 'pointer',
          }}
        >
          {label}
        </label>
      );
    }
    return null;
  }, [htmlLabelName, label, name]);

  return (
    <div
      className={classNames(htmlName, className, 'my-3 align-self-baseline')}
    >
      {labelComponent}
      {body}
    </div>
  );
};

export default FieldWrapper;
