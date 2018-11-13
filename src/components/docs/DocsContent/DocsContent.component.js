import React from "react";

import MDContent from "../../content/MDContent";
import {
  Anchor,
  Wrapper,
  Header,
  ContentHeader,
  ContentDescription,
} from "./styled";

const DocsContent = ({ content, tokenize }) => {
  if (!content) {
    return null;
  }

  let lastTypeHash;
  const { docs = [] } = content;

  return (
    <Wrapper>
      <ContentHeader>{content.displayName}</ContentHeader>
      <ContentDescription>
        {docs.map((item, idx) => {
          const type = item.type || item.title;
          const tokenizedType = tokenize(type);
          const hash = `${tokenizedType}-${tokenize(item.title)}`;

          const currentTypeHash = `${tokenizedType}-${tokenizedType}`;
          const isFirstOfType = lastTypeHash !== currentTypeHash;
          lastTypeHash = currentTypeHash;

          return (
            <div key={idx}>
              {isFirstOfType &&
                currentTypeHash !== hash && <Anchor id={currentTypeHash} />}
              <Header id={hash}>{item.title}</Header>
              <MDContent html={item.source} />
            </div>
          );
        })}
      </ContentDescription>
    </Wrapper>
  );
};
export default DocsContent;
