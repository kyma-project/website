import React from "react";
import styled from "styled-components";
import { sortByOrder, filterWithoutInternal } from "../../helpers/helpers";
import MDContent from "../../../../content/MDContent";

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  margin: 0 0 20px 0;
  text-align: left;
`;

const Header = styled.h1`
  font-size: 34px;
  font-weight: 600;
  border-bottom: 1px solid #e5e5e5;
  margin-top: 36px;
  margin-bottom: 24px;
  font-weight: 600;
  line-height: 1.25;
  padding-bottom: 0.3em;
`;

const ContentHeader = styled.h1`
  box-sizing: border-box;
  width: 100%;
  font-size: 40px;
  font-weight: 600;
  line-height: 1.3em;
  margin: 0 0 20px;
  &:first-letter {
    text-transform: uppercase;
  }
`;

const ContentDescription = styled.div`
  box-sizing: border-box;
  width: 100%;
  margin: 0;
`;

const Anchor = styled.a`
  display: block;
  height: 0;
  overflow: none;
  visibility: hidden;
`;

const ContentWrapper = ({ content }) => {
  let docs = null;

  if (content.docs) {
    docs = sortByOrder(content.docs);
    docs = filterWithoutInternal(docs);
  }

  let lastTypeHash;
  let removeSpaces = name => {
    return name
      .trim()
      .replace(/ /g, "-")
      .toLowerCase();
  };

  return (
    <div>
      {content && (
        <Wrapper>
          <ContentHeader>{content.displayName}</ContentHeader>
          <ContentDescription>
            {docs &&
              docs.map((item, i) => {
                const hash = `${removeSpaces(item.type)}-${removeSpaces(
                  item.title,
                )}`;
                let isFirtsOfType = false;
                const currentTypeHash = `${removeSpaces(
                  item.type,
                )}-${removeSpaces(item.type)}`;

                isFirtsOfType = lastTypeHash !== currentTypeHash;
                lastTypeHash = currentTypeHash;

                return (
                  <div key={i}>
                    {isFirtsOfType && <Anchor id={currentTypeHash} />}
                    <Header id={hash}>{item.title}</Header>
                    <MDContent html={item.source} />
                  </div>
                );
              })}
          </ContentDescription>
        </Wrapper>
      )}
    </div>
  );
};
export default ContentWrapper;
