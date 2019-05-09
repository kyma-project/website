let offset = 0;
let options = null;

const cumulativeOffset = element => {
  let top = 0;
  do {
    top += element.offsetTop || 0;
    element = element.offsetParent;
  } while (element);

  return top;
};

const evaluateOffset = pathname => {
  const windowWidth = window.innerWidth;

  let optionsForPath = {};
  for (const path in options.paths) {
    if (pathname.includes(path)) {
      optionsForPath = options.paths[path];
      break;
    }
  }

  if (windowWidth <= 1024) {
    if (optionsForPath.mobileOffset !== undefined) {
      offset = optionsForPath.mobileOffset;
    } else {
      offset = options.mobileOffset || 0;
    }
  } else {
    if (optionsForPath.defaultOffset !== undefined) {
      offset = optionsForPath.defaultOffset;
    } else {
      offset = options.defaultOffset || 0;
    }
  }
};

const getTargetOffset = (hash, pathname) => {
  const id = window.decodeURI(hash.replace(`#`, ``));
  if (id !== ``) {
    const element = document.getElementById(id);
    if (element) {
      evaluateOffset(pathname);
      return cumulativeOffset(element) - offset;
    }
  }
  return null;
};

const checkCorrectLocationsForModal = ({
  previousLocation,
  location,
  getSavedScrollPosition,
}) => {
  if (location.hash) return false;

  if (/\/roadmap\/[a-z]/.test(location.pathname)) {
    const offset = getSavedScrollPosition(previousLocation);
    if (offset) {
      window.scrollTo(offset);
    }
    return true;
  }

  if (
    /\/roadmap/.test(location.pathname) &&
    /\/roadmap\/[a-z]/.test(previousLocation.pathname)
  ) {
    const offset = getSavedScrollPosition(previousLocation);
    if (offset) {
      window.scrollTo(offset);
      document.querySelector(`html`).style.overflowY = `auto`;
    }
    return true;
  }

  return false;
};

exports.onInitialClientRender = (_, pluginOptions) => {
  options = pluginOptions;
  window.__GATSBY_INITIAL_RENDER_COMPLETE = true;

  requestAnimationFrame(() => {
    const offset = getTargetOffset(
      window.location.hash,
      window.location.pathname,
    );
    if (offset !== null) {
      setTimeout(() => window.scrollTo(0, offset), 10);
    }
  });
};

exports.shouldUpdateScroll = ({
  prevRouterProps: { location: previousLocation },
  routerProps: { location },
  getSavedScrollPosition,
}) => {
  // for modal
  if (
    checkCorrectLocationsForModal({
      previousLocation,
      location,
      getSavedScrollPosition,
    })
  ) {
    return false;
  }
  document.querySelector(`html`).style.overflowY = `auto`;

  // for anchors
  const offset = getTargetOffset(location.hash, location.pathname);
  return offset !== null ? [0, offset] : true;
};
