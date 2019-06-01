import { useState, useEffect, useCallback } from "react";

export default function useToggle(
  dropEl: any,
  actionEl: any,
  hiddenOnClickOnAction: boolean = true,
) {
  dropEl = dropEl.current;
  actionEl = actionEl.current;

  const [drop, setDrop] = useState(false);

  const toggleDrop = useCallback(
    toggleState => {
      setDrop(toggleState !== undefined ? Boolean(toggleState) : !drop);
    },
    [drop],
  );

  const onWindowClick = useCallback(
    ev => {
      const clickOnDrop =
        dropEl && (ev.target === dropEl || dropEl.contains(ev.target));

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
