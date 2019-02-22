import React from "react";
import styled from "@styled";
import { customScrollBar } from "@styled/mixins";

// @ts-ignore
import Highlight, { defaultProps } from "prism-react-renderer";
// @ts-ignore
import theme from "./theme";

const HighlightWrapper = styled.div`
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier,
    monospace !important;
  background: rgb(250, 250, 250);
  border: 1px solid rgb(229, 229, 229);
  border-radius: 5px;
  margin: 0 0 16px 0;
  padding-bottom: 16px;
  white-space: nowrap;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;

  ${customScrollBar({
    thumbColor: "#d4d4d4",
    trackColor: "#f1f1f1",
  })}

  > pre {
    padding: 16px 16px 0 16px;
    margin-bottom: 0 !important;

    > code {
      word-break: normal;
      white-space: pre;
      overflow-wrap: normal;
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
  return (
    <HighlightWrapper>
      <Highlight
        {...defaultProps}
        code={children ? children : value}
        theme={theme}
        language={language ? language : "yaml"}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }: any) => (
          <pre className={className} style={style}>
            <code>
              {tokens.map((line: any, i: number) => (
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token: any, key: number) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
    </HighlightWrapper>
  );
};
