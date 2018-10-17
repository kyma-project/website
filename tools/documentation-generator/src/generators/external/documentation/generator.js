const {
  mapToFileInfo,
  getResourcesFromFiles,
  getDocumentsFromFiles,
  createFileMap,
  createResultObj,
  parseDocs,
  copyResources,
  getRawContentOfFiles,
  validateDocsConfig,
  ensureSwaggerGeneration,
  saveResult,
  getDocsConfig,
  validateConfig,
  evaluateDocs,
  getFilesPaths,
  copyFile,
  getTypeId,
} = require("./common/helpers");

async function generateDocumentation(config) {
  await validateConfig(config);

  const docuConfig = await getDocsConfig(config.docsConfigPath);
  const documentExtensions = config.DOCUMENT_EXTENSIONS;

  validateDocsConfig(docuConfig);
  const documentId = docuConfig.spec.id;
  const documentTypeId = getTypeId(docuConfig.spec.type);

  const filesPaths = await getFilesPaths(config.srcPath);
  const filesInfo = mapToFileInfo(filesPaths);
  const fileResources = getResourcesFromFiles(filesInfo, documentExtensions);
  const documentFiles = getDocumentsFromFiles(filesInfo, documentExtensions);

  const rawContent = await getRawContentOfFiles(documentFiles);

  const files = createFileMap(documentFiles, rawContent, filesInfo);
  const evaluatedDocs = await evaluateDocs(
    files,
    documentFiles,
    documentTypeId,
    documentId,
    config.resourcesBaseURI,
    config.RESOURCES_DIRECTORY,
  );

  const parsedDocs = parseDocs(documentFiles, evaluatedDocs);

  const result = createResultObj(parsedDocs, docuConfig);

  const contentOutPath = `${config.outPath}/${documentTypeId}/${documentId}`;
  const apiSwaggerFilename = config.API_SWAGGER_FILENAME;
  const srcSwaggerApiPath = `${config.srcApiPath}/${apiSwaggerFilename}`;
  const srcRamlApiPath = `${config.srcApiPath}/${config.API_RAML_FILENAME}`;
  const apiSpecOutPath = `${contentOutPath}/${apiSwaggerFilename}`;
  const srcAsyncApiPath = `${config.srcAsyncApiPath}/${
    config.ASYNC_API_FILENAME
  }`;
  const asyncApiOutPath = `${contentOutPath}/${config.ASYNC_API_FILENAME}`;

  await ensureSwaggerGeneration(
    srcRamlApiPath,
    apiSpecOutPath,
    srcSwaggerApiPath,
  );

  await copyFile(srcAsyncApiPath, asyncApiOutPath);

  const resultFileName = config.RESULT_FILENAME;
  await saveResult(result, contentOutPath, resultFileName);

  const resourcesDirectory = config.RESOURCES_DIRECTORY;
  try {
    await copyResources(
      resourcesDirectory,
      contentOutPath,
      evaluatedDocs,
      fileResources,
    );
  } catch (e) {
    console.error("Error during copyResources:", e);
    throw e;
  }

  console.log(`Content generated to directory ${config.outPath}.`);
}

module.exports = { generateDocumentation };
