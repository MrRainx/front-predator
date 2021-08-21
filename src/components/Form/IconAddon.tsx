import React from 'react';

const IconAddon: React.FC<{ icon: string }> = React.forwardRef(({ icon }, _) => {
  return (
    <span className="p-inputgroup-addon">
      <i className={icon} />
    </span>
  );
});

export default IconAddon;
