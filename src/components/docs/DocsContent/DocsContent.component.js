import React from "react";

import MDContent from "../../content/MDContent";
import {
  Anchor,
  Wrapper,
  Header,
  ContentHeader,
  ContentH1,
  ContentDescription,
} from "./styled";

import { SCROLL_SPY_ROOT_ELEMENT } from "../../../constants/docs";
import chainData from "../../../constants/chainData";

const DocsContent = ({ content, tokenize, contentId }) => {
  if (!content) {
    return null;
  }

  const { docs = [] } = content;

  const docsTypesLength = (() => {
    let docsTypesLength = {};
    docs.map(doc => {
      const type = doc.type || doc.title;
      if (!(type in docsTypesLength)) {
        docsTypesLength[type] = 0;
      }
      if (doc.title) docsTypesLength[type]++;

      return doc;
    });
    return docsTypesLength;
  })();
  let lastType = "";

  return (
    <Wrapper id={SCROLL_SPY_ROOT_ELEMENT}>
      <ContentHeader>
        <ContentH1 id={contentId}>
          <a
            href={`#${contentId}`}
            aria-hidden="true"
            className={chainData.className}
          >
            {chainData.svgIcon}
          </a>
          {content.displayName}
        </ContentH1>
      </ContentHeader>
      <ContentDescription>
        {docs.map((item, idx) => {
          const type = item.type || item.title;
          const tokenizedType = tokenize(type);
          const hash = `${tokenizedType}-${tokenize(item.title)}`;
          const typeHash = `${tokenizedType}-${tokenizedType}`;

          const isFirstOfType = type !== lastType;
          lastType = type;

          const typeLength = docsTypesLength[type];

          return (
            <div key={idx}>
              {isFirstOfType && typeLength && (
                <Anchor
                  id={typeHash}
                  data-scrollspy-node-type="groupOfDocuments"
                />
              )}
              <Header
                id={hash}
                data-scrollspy-node-type={
                  typeLength ? "document" : "groupOfDocuments"
                }
              >
                <a
                  href={`#${hash}`}
                  aria-hidden
                  className={chainData.className}
                >
                  {chainData.svgIcon}
                </a>
                {item.title}
              </Header>
              <MDContent html={item.source} />
            </div>
          );
        })}
      </ContentDescription>
    </Wrapper>
  );
};
export default DocsContent;
