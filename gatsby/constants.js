const BLOG_POST_DIR = "blog-posts/";
const DOCS_DIR = "docs/";

const ASSETS_DIR = "assets/";

const BLOG_PATH_PREFIX = "blog";
const DOCS_PATH_PREFIX = "docs";

const DOCS_LATEST_VERSION = "latest";
const DOCS_ROOT_TYPE = "root";
const DOCS_COMPONENTS_TYPE = "components";
const DOCS_KYMA_ID = "kyma";

const BLOG_POST_FILENAME_REGEX = /([0-9]+)\-([0-9]+)\-([0-9]+)\-(.+)\/index\.md$/;
const DOCS_FILENAME_REGEX = /(\d+.\d+|master)\/(.+)\/docs\/(.+)\.md$/;

const POSTS_PER_PAGE = 8;

module.exports = {
  BLOG_POST_DIR,
  DOCS_DIR,
  ASSETS_DIR,
  BLOG_PATH_PREFIX,
  DOCS_PATH_PREFIX,
  DOCS_LATEST_VERSION,
  DOCS_ROOT_TYPE,
  DOCS_COMPONENTS_TYPE,
  DOCS_KYMA_ID,
  BLOG_POST_FILENAME_REGEX,
  DOCS_FILENAME_REGEX,
  POSTS_PER_PAGE,
};
