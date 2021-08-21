import React from 'react';
import { Menubar } from 'primereact/menubar';
const Component = (props, ref) => {
  return (
    <header ref={ref}>
      <Menubar
        className="shadow disable-left-button"
        model={[
          {
            label: 'Prueba',
          },
        ]}
        // end={(e) => end}
      />
    </header>
  );
};
Component.displayName = 'PrivateNavbar';

const PrivateNabvar = React.forwardRef(Component);

export default PrivateNabvar;
