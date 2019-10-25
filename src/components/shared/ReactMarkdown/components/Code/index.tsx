import React from "react";
import styled from "@styled";
import { customScrollBar } from "@styled/mixins";

import Highlight, { defaultProps } from "prism-react-renderer";

import CopyButton from "./CopyButton";
import theme from "./theme";

const CodeWrapper = styled.div`
  position: relative;
  margin: 0 0 16px 0;
`;

const HighlightWrapper = styled.div`
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier,
    monospace !important;
  background: rgb(250, 250, 250);
  border: 1px solid rgb(229, 229, 229);
  border-radius: 5px;
  padding-bottom: 16px;
  white-space: nowrap;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;

  ${customScrollBar({
    thumbBorderRadius: "0 0 4px 4px",
    trackBorderRadius: "0 0 4px 4px",
  })}

  > pre {
    padding: 16px 16px 0 16px;
    margin-bottom: 0 !important;

    > code {
      word-break: normal;
      white-space: pre;
      overflow-wrap: normal;

      > div span:last-child {
        padding-right: 16px;
      }
    }
  }
`;

interface CodeProps {
  language: string;
  value: string;
}

export const Code: React.FunctionComponent<CodeProps> = ({
  language,
  value,
  children,
}) => {
  const code = children ? children : value;
  if (!code) {
    return null;
  }

  const processedCode = (code as string)
    .replace(/&#60;/gm, "<")
    .replace(/^(\$ *)/gm, "");

  if (!processedCode.replace(/ /g, "")) {
    return null;
  }

  return (
    <CodeWrapper>
      <CopyButton code={processedCode} />
      <HighlightWrapper>
        <Highlight
          {...defaultProps}
          code={processedCode}
          theme={theme}
          language={language ? language : "yaml"}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }: any) => (
            <pre className={className} style={style}>
              <code>
                {tokens.map((line: any, i: number) => (
                  <div {...getLineProps({ line, key: i })} key={i}>
                    {line.map((token: any, key: number) => {
                      const tokenProps = getTokenProps({ token, key });
                      return !(
                        tokenProps.className.includes("plain") &&
                        !tokenProps.children
                      ) ? (
                        <span {...getTokenProps({ token, key })} />
                      ) : null;
                    })}
                  </div>
                ))}
              </code>
            </pre>
          )}
        </Highlight>
      </HighlightWrapper>
    </CodeWrapper>
  );
};
