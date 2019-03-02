import { useState } from "react";

interface Toast {
  id: number;
  content: any;
}

const useToastsCounter = () => {
  const [toastCount, setCount] = useState(0);
  const toastIncrement = () => setCount(toastCount + 1);
  return { toastCount, toastIncrement };
};

export const useToasts = () => {
  const [toasts, setToasts] = useState([] as Toast[]);
  const { toastCount, toastIncrement } = useToastsCounter();

  const addToast = (content: any) => {
    toastIncrement();
    const id = toastCount;

    const toast: Toast = { content, id };
    setToasts([...toasts, toast]);
  };

  const removeToast = (id: number) => {
    const newToasts = toasts.filter(t => t.id !== id);
    setToasts(newToasts);
  };

  // avoid creating a new fn on every render
  const onDismissToast = (id: number) => () => removeToast(id);

  return { toasts, addToast, removeToast, onDismissToast };
};
