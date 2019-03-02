import React, { useContext } from "react";

import { ToastsState } from "@common/state";

import { ToastsContainer, Toast } from "./styled";

const Toasts: React.FunctionComponent = ({ children }) => {
  const { toasts, onDismissToast } = useContext(ToastsState.Context);

  return (
    <ToastsContainer>
      {toasts.map(({ content, id }) => (
        <Toast key={id} onClick={onDismissToast(id)}>
          {content}
        </Toast>
      ))}
    </ToastsContainer>
  );
};

export default Toasts;
