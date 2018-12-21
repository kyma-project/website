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

const DocsContent = ({ content, tokenize }) => {
  if (!content) {
    return null;
  }

  let lastTypeHash;
  const { docs = [] } = content;

  const chainData = {
    svgIcon: (
      <svg
        aria-hidden="true"
        height="16"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fillRule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        />
      </svg>
    ),
    className: `anchor-chain`,
  };

  return (
    <Wrapper>
      <ContentHeader>
        <ContentH1 id={content.displayName.toLowerCase()}>
          <a
            href={`#${content.displayName.toLowerCase()}`}
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

          const currentTypeHash = `${tokenizedType}-${tokenizedType}`;
          const isFirstOfType = lastTypeHash !== currentTypeHash;
          lastTypeHash = currentTypeHash;

          return (
            <div key={idx}>
              {isFirstOfType && currentTypeHash !== hash && (
                <Anchor id={currentTypeHash} />
              )}
              <Header id={hash}>
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
