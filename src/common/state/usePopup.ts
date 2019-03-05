import { useState } from "react";
import { useTimeout } from "rooks";

const popupTimeout = 1500;

export const usePopup = () => {
  const [popup, setPopupText] = useState<any>(null);
  const [popupVisible, setPopupVisible] = useState(false);

  const { start, clear } = useTimeout(() => {
    setPopupVisible && setPopupVisible(false);
    clear && clear();
  }, popupTimeout);

  const setPopup = (content: any) => {
    clear();
    setPopupText(content);
    setPopupVisible(true);
    start();
  };

  const onDismissPopup = () => {
    setPopupVisible(false);
    clear();
  };

  return { popup, setPopup, popupVisible, onDismissPopup };
};
