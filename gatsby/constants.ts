const BLOG_POST_DIR = "blog-posts/";
const DOCS_DIR = "docs/";
const COMMUNITY_DIR = "community/";
const ROADMAP_CAPABILITIES_DIR = "roadmap/capabilities";
const ROADMAP_TICKETS_DIR = "roadmap/tickets";

const ASSETS_DIR = "assets/";

const BLOG_PATH_PREFIX = "blog";
const DOCS_PATH_PREFIX = "docs";
const COMMUNITY_PATH_PREFIX = "community";
const ROADMAP_PATH_PREFIX = "roadmap";

const COMMUNITY_GET_STARTED_TYPE = "get-started";

const DOCS_LATEST_VERSION = "latest";
const DOCS_ROOT_TYPE = "root";
const DOCS_COMPONENTS_TYPE = "components";
const DOCS_KYMA_ID = "kyma";

const BLOG_POST_FILENAME_REGEX = /([0-9]+)\-([0-9]+)\-([0-9]+)\-(.+)\/index\.md$/;
const DOCS_FILENAME_REGEX = /(\d+.\d+|master|note)\/(.+)\/docs\/(.+)\.md$/;
const COMMUNITY_FILENAME_REGEX = /community\/(.+)\/docs\/(.+)\.md$/;
const ROADMAP_CAPABILITY_FILENAME_REGEX = /roadmap\/capabilities\/(.+)\.md$/;

const POSTS_PER_PAGE = 8;

export {
  BLOG_POST_DIR,
  DOCS_DIR,
  COMMUNITY_DIR,
  ROADMAP_CAPABILITIES_DIR,
  ROADMAP_TICKETS_DIR,
  ASSETS_DIR,
  BLOG_PATH_PREFIX,
  DOCS_PATH_PREFIX,
  COMMUNITY_PATH_PREFIX,
  ROADMAP_PATH_PREFIX,
  COMMUNITY_GET_STARTED_TYPE,
  DOCS_LATEST_VERSION,
  DOCS_ROOT_TYPE,
  DOCS_COMPONENTS_TYPE,
  DOCS_KYMA_ID,
  BLOG_POST_FILENAME_REGEX,
  DOCS_FILENAME_REGEX,
  COMMUNITY_FILENAME_REGEX,
  ROADMAP_CAPABILITY_FILENAME_REGEX,
  POSTS_PER_PAGE,
};
