import { Internationalization } from "./types";

// en
import enLayout from "@content/i18n/en/layout.json";
import en404 from "@content/i18n/en/404.json";
import enCookies from "@content/i18n/en/cookies.json";
import enLandingPage from "@content/i18n/en/landing-page.json";
import enDocs from "@content/i18n/en/docs.json";
import enBlog from "@content/i18n/en/blog.json";
import enRoadmap from "@content/i18n/en/roadmap.json";
import enSearch from "@content/i18n/en/search.json";
import enSiteMetadata from "@content/i18n/en/siteMetadata.json";
import enUtils from "@content/i18n/en/utils.json";

const intl: Internationalization = {
  en: {
    layout: enLayout,
    "404": en404,
    cookies: enCookies,
    landingPage: enLandingPage,
    docs: enDocs,
    blog: enBlog,
    roadmap: enRoadmap,
    search: enSearch,
    siteMetadata: enSiteMetadata,
    utils: enUtils,
  },
};

export default intl;
