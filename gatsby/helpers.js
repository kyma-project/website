const i18nConfig = require("../config").i18n;

const createIntlPage = ({ actions }) => {
  const { createPage, createRedirect } = actions;

  return ({ path, component, context }) => {
    Object.keys(i18nConfig).map(lang => {
      const isDefaultLang = i18nConfig[lang].default;

      let localizedPath = isDefaultLang
        ? path
        : `${i18nConfig[lang].path}${path}`;

      // localizedPath = localizedPath.endsWith("/")
      //   ? localizedPath.slice(0, -1)
      //   : localizedPath;
      localizedPath = localizedPath.startsWith("/")
        ? localizedPath
        : `/${localizedPath}`;

      createRedirects({
        createRedirect,
        lang,
        isDefaultLang,
        localizedPath,
      });

      createPage({
        path: localizedPath,
        component,
        context: {
          ...context,
          locale: lang,
        },
      });
    });
  };
};

const createRedirects = ({
  createRedirect,
  lang,
  isDefaultLang,
  localizedPath,
}) => {
  if (localizedPath === "/") {
    createRedirect({
      fromPath: "/index",
      redirectInBrowser: true,
      toPath: "/",
    });

    createRedirect({
      fromPath: "/index.html",
      redirectInBrowser: true,
      toPath: "/",
    });

    if (isDefaultLang) {
      createRedirect({
        fromPath: `/${i18nConfig[lang].path}`,
        redirectInBrowser: true,
        toPath: "/",
      });

      createRedirect({
        fromPath: `/${i18nConfig[lang].path}/`,
        redirectInBrowser: true,
        toPath: "/",
      });
    }

    return;
  }

  // createRedirect({
  //   fromPath: `${localizedPath}/`,
  //   redirectInBrowser: true,
  //   toPath: localizedPath,
  // });

  createRedirect({
    fromPath: `${localizedPath}.html`,
    redirectInBrowser: true,
    toPath: localizedPath,
  });

  if (isDefaultLang) {
    createRedirect({
      fromPath: `/${i18nConfig[lang].path}${localizedPath}`,
      redirectInBrowser: true,
      toPath: localizedPath,
    });

    // createRedirect({
    //   fromPath: `/${i18nConfig[lang].path}${localizedPath}/`,
    //   redirectInBrowser: true,
    //   toPath: localizedPath,
    // });

    createRedirect({
      fromPath: `/${i18nConfig[lang].path}${localizedPath}.html`,
      redirectInBrowser: true,
      toPath: localizedPath,
    });
  }
};

module.exports = { createIntlPage };
