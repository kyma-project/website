import { Node } from "gatsby";
import { resolve as resolvePath } from "path";
import { createWriteStream } from "fs";
import axios, { AxiosResponse } from "axios";

import { CreateNodeField } from "../../../types";
import {
  ASSETS_DIR,
  ADOPTERS_DIR,
  ADOPTER_FILENAME_REGEX,
  DOWNLOADED_LOGO_NAME,
} from "../../../constants";

interface OnCreateAdopterNode {
  node: Node & { frontmatter?: { logo?: string } };
  relativePath: string;
  createNodeField: CreateNodeField;
}

export const onCreateAdopterNode = async ({
  node,
  relativePath,
  createNodeField,
}: OnCreateAdopterNode) => {
  const logo = node.frontmatter && node.frontmatter.logo;
  if (!logo) {
    throw new Error(
      "logo field must be provided in frontmatter object of case study.",
    );
  }

  if (!logo.endsWith(".svg")) {
    throw new Error("logo of company must be in svg format.");
  }

  let svgName = logo.split("/").reverse()[0];
  if (logo.startsWith("http")) {
    svgName = DOWNLOADED_LOGO_NAME;

    const resolvedSvgPath = resolvePath(
      __dirname,
      "../../../../content/",
      relativePath.replace("/index.md", ""),
      DOWNLOADED_LOGO_NAME,
    );
    await downloadAndWriteSvg(logo, resolvedSvgPath);
  }

  const match = ADOPTER_FILENAME_REGEX.exec(relativePath);
  if (!match || match.length < 2) return;

  const fileName = match[1];
  const assetsPath = `/${ASSETS_DIR}${ADOPTERS_DIR}${fileName}/${svgName}`;

  createNodeField({
    node,
    name: "assetsPath",
    value: assetsPath,
  });
};

async function downloadAndWriteSvg(
  url: string,
  svgPath: string,
): Promise<void> {
  const writer = createWriteStream(svgPath);
  const response: AxiosResponse = await axios({
    url,
    method: "GET",
    responseType: "stream",
  });
  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
}
