import classNames from 'classnames';
import React, { useMemo } from 'react';
import useName from './hooks/useName';

const Group: React.FC<{ name?: string }> = React.forwardRef(
  ({ name = '', children }, ref) => {
    const newName = useName({ name });
    const body = useMemo(() => {
      return React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            name,
            //@ts-ignore
            ref: ref,
          });
        }
        return child;
      });
    }, [children, name, ref]);

    return (
      <div
        className={classNames(
          'p-inputgroup',
          'field-container',
          `group__${newName}`,
        )}
      >
        {body}
      </div>
    );
  },
);

export default Group;
