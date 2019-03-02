import { useState } from "react";
import { useTimeout } from "rooks";

const popupTimeout = 3500;

export const usePopup = () => {
  const [popup, setP] = useState(null as any);
  const [popupVisible, setPopupVisible] = useState(false);

  const { start, clear } = useTimeout(() => {
    setPopupVisible(false);
    clear();
  }, popupTimeout);

  const setPopup = (content: any) => {
    clear();
    setP(content);
    setPopupVisible(true);
    start();
  };

  const onDismissPopup = () => {
    setPopupVisible(false);
    clear();
  };

  return { popup, setPopup, popupVisible, onDismissPopup };
};
