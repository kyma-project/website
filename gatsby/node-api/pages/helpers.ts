import { Actions } from "gatsby";
import { CreatePageFn, CreateRedirectFn } from "../../types";

interface Intl {
  [lang: string]: {
    path: string;
    locale: string;
    default?: boolean;
  };
}
const i18nConfig: Intl = require("../../../config").i18n;

export const createIntlPage = (actions: Actions): CreatePageFn => {
  const { createPage, createRedirect: cr } = actions;

  return ({
    path,
    component,
    context,
  }: {
    path: string;
    component: string;
    context: Record<string, any>;
  }) => {
    Object.keys(i18nConfig).map(lang => {
      const isDefaultLang: boolean | undefined = i18nConfig[lang].default;
      path = path.startsWith("/") ? path : `/${path}`;

      let localizedPath = isDefaultLang
        ? path
        : `/${i18nConfig[lang].path}${path}`;

      const createRedirect = cr as CreateRedirectFn;
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
}: {
  createRedirect: CreateRedirectFn;
  lang: string;
  isDefaultLang?: boolean;
  localizedPath: string;
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

    createRedirect({
      fromPath: `/${i18nConfig[lang].path}${localizedPath}.html`,
      redirectInBrowser: true,
      toPath: localizedPath,
    });
  }
};
