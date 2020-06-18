// copied and adapted from https://github.com/mdreizin/gatsby-plugin-robots-txt

const fs = require("fs");
const robotsTxt = require("generate-robotstxt");
const path = require("path");
const url = require("url");

const publicPath = "./public";
const defaultEnv = "development";
const defaultOptions = {
  output: "/robots.txt",
  query: `{
    site {
      siteMetadata {
        siteUrl
      }
    }
  }`,
};

function writeFile(file, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function runQuery(handler, query) {
  return handler(query).then(res => {
    if (res.errors) {
      throw new Error(res.errors.join(", "));
    }

    return res.data;
  });
}

const getOptions = pluginOptions => {
  const options = { ...pluginOptions };

  delete options.plugins;

  const {
    env = {},
    resolveEnv = () => process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV,
  } = options;

  const envOptions = env[resolveEnv()] || env[defaultEnv] || {};

  delete options.env;
  delete options.resolveEnv;

  return { ...options, ...envOptions };
};

exports.onPostBuild = async function onPostBuild({ graphql }, pluginOptions) {
  const userOptions = getOptions(pluginOptions);
  const mergedOptions = { ...defaultOptions, ...userOptions };

  if (
    !Object.prototype.hasOwnProperty.call(mergedOptions, "host") ||
    !Object.prototype.hasOwnProperty.call(mergedOptions, "sitemap")
  ) {
    const {
      site: {
        siteMetadata: { siteUrl },
      },
    } = await runQuery(graphql, mergedOptions.query);

    mergedOptions.host = siteUrl;
    mergedOptions.sitemap = url.resolve(siteUrl, "sitemap.xml");
  }

  const { sitemap, host, output, configFile } = mergedOptions;

  const distintDocs = await runQuery(
    graphql,
    `query DocsFolders {
  allDirectory(filter: {relativePath: {glob: "docs/*"}}) {
    distinct(field: relativePath)
  }
}
`,
  );

  const policy = [
    {
      userAgent: "*",
      allow: ["/docs/"],
      disallow: [
        "/docs/latest/",
        ...distintDocs.allDirectory.distinct.map(version => `/${version}/`),
      ],
    },
  ];

  const content = await robotsTxt({
    policy,
    sitemap,
    host,
    configFile,
  });
  const filename = path.join(publicPath, output);

  return await writeFile(path.resolve(filename), content);
};
