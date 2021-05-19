import { ContentLoader } from "./contentLoader";
import {
  ContentGQL,
  DocsContent,
  DocsContentItem,
  DocsContentDocs,
  DocsNavigationTopic,
} from "./types";
import { extractContent } from "./extractContent";
import { loadManifest } from "./loadManifest";

import { Specification } from "@typings/docs";

const contentLoader = new ContentLoader();

export const docsGenerator = <T extends ContentGQL>(
  contentGQLs: T[],
  folder: string,
  extractFn: (
    doc: T,
    docsGroup: string,
    topicId: string,
  ) => DocsContentDocs | null,
  version?: string,
) => {
  const navigation: DocsNavigationTopic[] = [];
  contentGQLs.forEach(item => {
    const filePath = item.fields.slug as string;
    const navigationPath = filePath.split("/");
    addChildren(navigation, navigationPath, item);
  });

  contentLoader.setFolder(folder);
  contentLoader.setVersion(version ? version : "");
  const manifestSpec = loadManifest(contentLoader.loadManifest()).spec;

  const content = extractContent<T>({
    manifestSpec,
    contentGQLs,
    contentLoader,
    extractFn,
  });

  const newBetterContent = {
    component: {},
  } as DocsContent;

  Object.keys(content).map(key => {
    const innerContent = content[key];
    Object.keys(innerContent).map(innerKey => {
      const component = innerContent[innerKey];
      component.docs.forEach(doc => {
        const tmpObj = {} as DocsContentItem;
        const id = doc.order.replace(".md", "");
        tmpObj.id = id;
        tmpObj.displayName = doc.title;
        tmpObj.type = "component";
        tmpObj.docs = [doc];
        tmpObj.specifications = [] as Specification[];

        newBetterContent.component[id] = tmpObj;
      });
    });
  });
  // pathy: /docs/version/path w drzewie/nazwa bez .md

  return {
    content: newBetterContent,
    navigation,
    manifest: navigation,
  };
};

export const addChildren = <T extends ContentGQL>(
  navigation: DocsNavigationTopic[],
  navigationPath: string[],
  item: T,
): void => {
  if (navigationPath.length === 0) {
    return;
  }

  let found: boolean = false;
  navigation.forEach(navigationItem => {
    if (navigationPath[0] === navigationItem.id) {
      addChildren(navigationItem.children, navigationPath.slice(1), item);
      found = true;
      return;
    }
  });
  if (found) {
    return;
  }

  // create if not found

  //TODO: if is leaf then add displayName from md
  const newDocsNavigationTopic = {
    id: navigationPath[0],
    displayName: navigationPath[0],
    children: [] as DocsNavigationTopic[],
  } as DocsNavigationTopic;
  addChildren(newDocsNavigationTopic.children, navigationPath.slice(1), item);

  // add child
  navigation.push(newDocsNavigationTopic);
};

export type DocsGeneratorReturnType = ReturnType<typeof docsGenerator>;
