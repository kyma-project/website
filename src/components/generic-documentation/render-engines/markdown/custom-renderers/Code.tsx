import React, { useState, useEffect } from "react";
import styled from "@styled";
import Link from "@components/shared/Link";
import {
  Code as BasicCode,
  CodeProps,
} from "@kyma-project/dc-markdown-render-engine/lib/renderers/Code";

import { findDownloadableLinks, DownloadableLink } from "../helpers";

const PreviewBlock = styled.ul``;
const SingleBlock = styled.li`
  > p {
    cursor: pointer;
  }
`;

const LinkContent: React.FunctionComponent<DownloadableLink & CodeProps> = ({
  link,
  extension,
  ...props
}) => {
  const [content, setContent] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (content) return;
    fetch(link)
      .then(response => response.text())
      .then(resultData => {
        setContent(resultData);
      });
  }, [showPreview]);

  return (
    <SingleBlock>
      <p>
        <span onClick={() => setShowPreview(!showPreview)}>
          Show preview for{" "}
        </span>
        <Link.External to={link}>{link}</Link.External>
      </p>
      {showPreview && content && (
        <BasicCode {...props} value={content} language={extension} />
      )}
    </SingleBlock>
  );
};

export const Code: React.FunctionComponent<CodeProps> = ({
  children,
  ...props
}) => {
  const code = (children ? children : props.value) as string;
  if (!code) {
    return null;
  }

  const links = findDownloadableLinks(code);
  const linksExist = links.length > 0;
  const renderedLinks = links.map(link => (
    <LinkContent key={link.link} {...link} {...props} />
  ));

  return (
    <>
      <BasicCode {...props}>{children}</BasicCode>
      {linksExist && <PreviewBlock>{renderedLinks}</PreviewBlock>}
    </>
  );
};
