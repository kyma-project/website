import config from "../../../../config.json";

import {
  OriginalCreatePageFn,
  CreatePageFn,
  CreateRedirectFn,
  CreatePageFnArgs,
} from "../../../types";

interface Intl {
  [lang: string]: {
    path: string;
    locale: string;
    default?: boolean;
  };
}
const i18nConfig: Intl = config.i18n;

export const createIntlPage = (
  createPage: OriginalCreatePageFn,
  createRedirect: CreateRedirectFn,
): CreatePageFn => ({ path, component, context }: CreatePageFnArgs) => {
  if (!component || !context) {
    console.error(
      `For ${path} path component or context field is not defined!`,
    );
    return;
  }

  Object.keys(i18nConfig).map(lang => {
    const isDefaultLang: boolean | undefined = i18nConfig[lang].default;
    path = path.startsWith("/") ? path : `/${path}`;

    const localizedPath = isDefaultLang
      ? path
      : `/${i18nConfig[lang].path}${path}`;

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

  if (!isDefaultLang) {
    return;
  }

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
};
