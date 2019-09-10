import { useState } from "react";
import createContainer from "constate";
import useTimeout from "@rooks/use-timeout";

const popupTimeout = 1500;

const usePopup = () => {
  const [popup, setPopupText] = useState<any>(null);
  const [popupVisible, setPopupVisible] = useState<boolean>(false);

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

export default createContainer(usePopup);
