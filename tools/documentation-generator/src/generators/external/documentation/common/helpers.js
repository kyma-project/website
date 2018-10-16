const path = require("path");
const metaMarked = require("meta-marked");
const fs = require("fs-extra");
const raml = require("./raml");
const evaluator = require("./evaluator");

async function evaluateDocs(
  files,
  documentFiles,
  documentType,
  documentCode,
  resourcesBaseURI,
  RESOURCES_DIRECTORY,
) {
  const evaluatedFiles = Object.assign({}, files);

  const evaluate = evaluator.createTemplateEvaluator(
    evaluatedFiles,
    resourcesBaseURI,
    documentType,
    documentCode,
    RESOURCES_DIRECTORY,
  );
  const evaluateDocs = documentFiles.map(async f => {
    try {
      const evaluatedRaw = await evaluate(evaluatedFiles[f.path].raw, {
        file: f,
      });
      evaluatedFiles[f.path].evaluatedRaw = evaluatedRaw;
    } catch (err) {
      throw new Error(`While evaluate "${f.path}": ${err.message}`);
    }
  });

  await Promise.all(evaluateDocs);

  return evaluatedFiles;
}

function getResourcesFromFiles(files, documentExtensions) {
  return files
    .filter(f => !documentExtensions.includes(f.ext))
    .map(f => f.path);
}

function getDocumentsFromFiles(files, documentExtensions) {
  return files.filter(f => documentExtensions.includes(f.ext));
}

function mapToFileInfo(paths = []) {
  return paths.map(p => ({
    path: p,
    base: path.basename(p),
    dir: path.dirname(p),
    ext: path.extname(p),
  }));
}

function createFileMap(documentFiles, raws, filesInfo) {
  let files = documentFiles.reduce((obj, f, i) => {
    obj[f.path] = {
      ...f,
      raw: raws[i],
    };
    return obj;
  }, {});

  filesInfo.forEach(f => {
    if (files[f.path]) return;
    files[f.path] = f;
  });

  return files;
}

function createResultObj(documents, docuConfig) {
  const docs = documents.filter(d => d.meta).map(d => {
    return {
      order: path.basename(d.path, path.extname(d.path)),
      ...d.meta,
      source: d.html,
    };
  });

  const result = {
    ...docuConfig.spec,
    docs,
  };

  return result;
}

function parseDocs(files, evaluatedDocs) {
  return files.map(f => {
    const content = evaluatedDocs[f.path].evaluatedRaw;

    const parsedDoc = _parseSingleDoc(content, f.path);
    return addTargetAttributeForExternalLinks(parsedDoc);
  });
}

function _parseSingleDoc(content, path) {
  const parsed = metaMarked(content);
  return {
    ...parsed,
    path,
  };
}

function addTargetAttributeForExternalLinks(doc) {
  const hrefRegex = /href=\"((https?|ftp):)?\/\/.*?\"/g;

  doc.html = doc.html.replace(
    hrefRegex,
    occurrence => `${occurrence} target="_blank"`,
  );

  return doc;
}

async function copyResources(
  resourcesDirectory,
  outPath,
  evaluatedDocs,
  fileResources,
) {
  const resourcesPath = path.join(outPath, resourcesDirectory);
  const copyingFiles = fileResources.map(p =>
    fs.copy(p, path.join(resourcesPath, evaluatedDocs[p].base)),
  );

  return await Promise.all(copyingFiles);
}

async function getRawContentOfFiles(files = []) {
  const rawsPromise = files.map(async f => await fs.readFile(f.path, "utf8"));
  return await Promise.all(rawsPromise);
}

async function ensureSwaggerGeneration(ramlPath, specPath, swaggerPath) {
  if (await fs.exists(ramlPath)) {
    await raml.convertRamlToSwagger(ramlPath, specPath);
  } else if (await fs.exists(swaggerPath)) {
    await fs.copy(swaggerPath, specPath);
  } else {
    console.log(`No API specification available`);
  }
}

async function copyFile(source, destination) {
  if (await fs.exists(source)) {
    await fs.copy(source, destination);
  } else {
    console.log(`File ${source} does not exist`);
  }
}

async function saveResult(result, outPath, resultFileName) {
  const resultFilePath = path.join(outPath, resultFileName);

  await fs.outputJSON(resultFilePath, result, { spaces: 2 });
}

async function getDocsConfig(docsConfigPath) {
  const docsConfig = await fs.readFile(docsConfigPath, "utf8");

  return JSON.parse(docsConfig);
}

function validateDocsConfig(config) {
  const { displayName, id, type, description } = config.spec;

  if (!displayName) {
    throw new Error("Invalid configuration: `displayName` cannot be empty");
  }

  if (!type) {
    throw new Error("Invalid configuration: `type` cannot be empty");
  }

  if (!description) {
    throw new Error("Invalid configuration: `description` cannot be empty");
  }

  if (!id) {
    throw new Error("Invalid configuration: `id` cannot be empty");
  }

  if (!/^[-a-z0-9]*$/.test(id)) {
    throw new Error(
      "Invalid configuration: `id` contains invalid characters. `id` should contain only numbers, lowercase letters and dashes",
    );
  }
}

function getTypeId(type = "") {
  return type
    .trim()
    .toLowerCase()
    .replace(/\s/g, "-")
    .replace(/[^-a-z0-9]/g, "");
}

async function validateConfig(config) {
  console.log("Validating...");
  const {
    srcPath,
    srcApiPath,
    srcAsyncApiPath,
    docsConfigPath,
    outPath,
  } = config;

  const isDocsConfigExist = await fs.pathExists(docsConfigPath);
  const isSrcPathExist = await fs.pathExists(srcPath);
  const isSrcApiPathExist = srcApiPath && (await fs.pathExists(srcApiPath));
  const isSrcAsyncApiPathExist =
    srcAsyncApiPath && (await fs.pathExists(srcAsyncApiPath));

  if (!isSrcPathExist) {
    throw new Error(
      `APP_SRC_PATH(${srcPath}) has not been provided or provided path does not exist!`,
    );
  }

  if (!isSrcApiPathExist) {
    console.warn(
      `Warning: APP_API_SRC_PATH(${srcApiPath}) has not been provided or provided path does not exist!`,
    );
  }

  if (!isSrcAsyncApiPathExist) {
    console.warn(
      `Warning: APP_ASYNC_API_SRC_PATH(${srcAsyncApiPath}) has not been provided or provided path does not exist!`,
    );
  }

  if (!isDocsConfigExist) {
    throw new Error(
      `APP_DOCS_CONFIG_PATH(${docsConfigPath}) does not exist or provided path does not exist!`,
    );
  }

  if (!outPath) {
    throw new Error(`APP_OUT_PATH not provided!`);
  }

  console.log("Validation done. Generation...");
}

//refactor & change & test in the next iteration
async function getFilesPaths(path) {
  const type = await fs.stat(path);
  if (type.isFile()) return path;
  const paths = await fs.readdir(path);
  const filesPromises = paths.map(
    async p => await getFilesPaths(`${path}/${p}`),
  );
  const files = await Promise.all(filesPromises);
  const flattenFiles = files.reduce(
    (arr, x) => (Array.isArray(x) ? [...arr, ...x] : [...arr, x]),
    [],
  );

  return flattenFiles;
}

module.exports = {
  getResourcesFromFiles,
  getDocumentsFromFiles,
  mapToFileInfo,
  createFileMap,
  createResultObj,
  parseDocs,
  copyResources,
  getRawContentOfFiles,
  validateDocsConfig,
  ensureSwaggerGeneration,
  saveResult,
  getDocsConfig,
  evaluateDocs,
  validateConfig,
  getFilesPaths,
  copyFile,
  getTypeId,
  addTargetAttributeForExternalLinks,
};
