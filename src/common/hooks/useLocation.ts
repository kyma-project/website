import { useEffect, useState } from "react";
import { globalHistory, HistoryLocation } from "@reach/router";

interface HookReturnVal {
  location: HistoryLocation;
}

export const useLocation = (): HookReturnVal => {
  const initialState = {
    location: globalHistory.location,
  };

  const [state, setState] = useState(initialState);
  useEffect(() => {
    const removeListener = globalHistory.listen(params => {
      const { location } = params;
      const newState = { ...initialState, location };
      if (newState.location.hash !== state.location.hash) {
        setState(newState);
      }
    });
    return () => {
      removeListener();
    };
  }, []);
  return state;
};
