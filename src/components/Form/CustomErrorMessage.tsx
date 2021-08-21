import { ErrorMessage } from "@hookform/error-message";
import React from "react";

const CustomErrorMessage: React.FC<{ name?: string }> = React.forwardRef(
  ({ name }, _) => {
    return (
      <ErrorMessage
        //@ts-ignore
        name={name}
        render={({ message, messages }) => {
          if (!messages) {
            return (
              <small
                className='p-error p-d-block w-100'
                style={{ fontSize: "15px", fontWeight: "bold" }}>
                {message}
              </small>
            );
          }
          return Object.entries(messages).map(([key, message]) => (
            <small
              className='p-error p-d-block w-100'
              style={{ fontSize: "15px", fontWeight: "bold" }}
              key={key}>
              {message}
            </small>
          ));
        }}
      />
    );
  }
);

export default CustomErrorMessage;
