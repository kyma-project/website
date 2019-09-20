import { useState, useEffect, useCallback } from "react";

export function useToggle<F = any, S = any>(
  dropEl: React.RefObject<F> | React.MutableRefObject<F>,
  actionEl: React.RefObject<S> | React.MutableRefObject<S>,
  hiddenOnClickOnAction: boolean = true,
): [boolean, (toogleState?: any) => void] {
  const dropElCurrent = dropEl.current;
  const actionElCurrent = actionEl.current;

  const [drop, setDrop] = useState(false);

  const toggleDrop = useCallback(
    toggleState => {
      setDrop(toggleState !== undefined ? Boolean(toggleState) : !drop);
    },
    [drop],
  );

  const onWindowClick = useCallback(
    ev => {
      const clickOnAction =
        actionElCurrent &&
        (ev.target === actionElCurrent ||
          (actionElCurrent as any).contains(ev.target));

      const clickOnDrop =
        dropElCurrent &&
        (ev.target === dropElCurrent ||
          (dropElCurrent as any).contains(ev.target));

      if (clickOnAction && !hiddenOnClickOnAction) {
        return;
      }

      if (!clickOnDrop && drop) {
        toggleDrop(false);
      }
    },
    [drop],
  );

  const onEsc = useCallback(
    ev => {
      if (ev.keyCode === 27 && drop === true) {
        toggleDrop(false);
      }
    },
    [drop],
  );

  useEffect(() => {
    window.addEventListener("click", onWindowClick);
    return () => window.removeEventListener("click", onWindowClick);
  });

  useEffect(() => {
    window.addEventListener("keyup", onEsc);
    return () => window.removeEventListener("keyup", onEsc);
  });

  return [drop, toggleDrop];
}
