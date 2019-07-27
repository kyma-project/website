import { MutableRefObject } from "react";

let lastHeight: number = 0;

export const checkIsInView = (
  ref: MutableRefObject<HTMLDivElement | undefined>,
) => (element: HTMLAnchorElement) => {
  const bounding = element.getBoundingClientRect();
  const current = ref && ref.current;

  if (!current) {
    return;
  }

  if (
    !(
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.right <=
        (window.innerWidth || document.documentElement.clientWidth) &&
      bounding.bottom <=
        (window.innerHeight || document.documentElement.clientHeight)
    )
  ) {
    let scrollAbout = Math.ceil(window.innerHeight * 0.7);
    const pageYOffset = window.pageYOffset;

    if (pageYOffset <= lastHeight) {
      scrollAbout = -scrollAbout;
    }
    lastHeight = pageYOffset;

    current.scrollBy(0, scrollAbout);
  }
};
