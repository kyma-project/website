import { ShouldUpdateScrollArgs } from "gatsby";

import { getTargetOffset } from "./helpers";

interface LocationRegExp {
  modalPath: RegExp;
  currentLocation: RegExp;
  previousLocation: RegExp;
}

const modalLocationRegExp: LocationRegExp[] = [
  // for docs-specification
  {
    modalPath: /^\/docs\/(.*?)\/specifications/,
    currentLocation: /^((?!(\/docs\/(.*?)\/specifications)).)*$/,
    previousLocation: /^\/docs\/(.*?)\/specifications/,
  },
  // for roadmap
  {
    modalPath: /^\/roadmap\/[a-z]/,
    currentLocation: /^\/roadmap/,
    previousLocation: /^\/roadmap\/[a-z]/,
  },
];

function checkCorrectLocationForModal({
  previousLocation,
  location,
  getSavedScrollPosition,
}: {
  previousLocation: Location;
  location: Location;
  // tslint:disable-next-line:ban-types
  getSavedScrollPosition: Function;
}): boolean {
  if (location.hash) {
    return false;
  }

  return modalLocationRegExp.some(loc => {
    if (loc.modalPath.test(location.pathname)) {
      const offset = getSavedScrollPosition(previousLocation);
      if (offset) {
        window.scrollTo(...offset);
      }
      return true;
    }

    if (
      loc.currentLocation.test(location.pathname) &&
      loc.previousLocation.test(previousLocation.pathname)
    ) {
      const offset = getSavedScrollPosition(previousLocation);
      if (offset) {
        window.scrollTo(...offset);
      }
      return true;
    }
    return false;
  });
}

export function shouldUpdateScroll({
  prevRouterProps,
  routerProps: { location },
  getSavedScrollPosition,
}: ShouldUpdateScrollArgs) {
  // for modal
  if (
    prevRouterProps &&
    checkCorrectLocationForModal({
      previousLocation: prevRouterProps.location,
      location,
      getSavedScrollPosition,
    })
  ) {
    return false;
  }

  // for anchors
  const offset = getTargetOffset(location.hash);

  // __GATSBY_ROUTE_UPDATE is updated in root service
  window.__GATSBY_ROUTE_UPDATED = false;
  return offset !== null ? [0, offset] : true;
}
