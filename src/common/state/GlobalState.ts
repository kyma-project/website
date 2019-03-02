import createContainer from "constate";

import { nest } from "./nest";

import { useToasts } from "./useToasts";
import { usePopup } from "./usePopup";

export const ToastsState = createContainer(useToasts);
export const PopupState = createContainer(usePopup);

export const GlobalState = nest(ToastsState.Provider, PopupState.Provider);
