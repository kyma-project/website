import createContainer from "constate";

import { nest } from "./nest";

import { usePopup } from "./usePopup";

export const PopupState = createContainer(usePopup);

export const GlobalState = nest(PopupState.Provider);
