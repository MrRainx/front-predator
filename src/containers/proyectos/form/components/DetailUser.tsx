/* eslint-disable @next/next/no-img-element */
import React from 'react';

const DetailUser = ({ usuario }) => {
  return (
    <React.Fragment>
      <img
        src="https://www.kindpng.com/picc/m/269-2697881_computer-icons-user-clip-art-transparent-png-icon.png"
        alt={usuario.username}
        className="mb-3"
        style={{ maxWidth: '70px' }}
      />
      <div className="text-xl text-900 font-medium">{usuario.username}</div>
      <p className="p-0 m-0">
        {usuario.firstName} {usuario.lastName}
      </p>
      <div className="text-blue-600">
        <a href={`mailto:${usuario.email}`}>{usuario.email}</a>
      </div>
    </React.Fragment>
  );
};

export default DetailUser;
