let offset = 0;
let options = null;

const evaluateOffset = pathname => {
  const windowWidth = window.innerWidth;

  const onMobileOffset = options.mobileOffsetInclude.some(arg =>
    pathname.includes(arg),
  );

  if (windowWidth <= 1024 && onMobileOffset) {
    offset = options.mobileOffset || 0;
  } else {
    offset = options.defaultOffset || 0;
  }
};

const getTargetOffset = (hash, pathname) => {
  const id = window.decodeURI(hash.replace(`#`, ``));
  if (id !== ``) {
    const element = document.getElementById(id);
    if (element) {
      evaluateOffset(pathname);
      return element.offsetTop - offset;
    }
  }
  return null;
};

exports.onInitialClientRender = (_, pluginOptions) => {
  options = pluginOptions;

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

exports.shouldUpdateScroll = ({ routerProps: { location } }) => {
  const offset = getTargetOffset(location.hash, location.pathname);
  return offset !== null ? [0, offset] : true;
};
