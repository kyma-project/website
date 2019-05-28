import { nest } from "./nest";

import PopupState from "./usePopup";

export const GlobalState = nest(PopupState.Provider);
