import React from "react";

import Grid from "@styled/Grid";

import CapabilitySvg from "@components/roadmap/Svg";
import H from "@components/shared/H";
import Button from "@components/shared/Button";
import ReactMarkdown from "@components/shared/ReactMarkdown";

import { Capability } from "../types";

import { ContentWrapper, Header, StyledReactMarkdown } from "./styled";

interface ContentProps {
  capabilities: Capability[];
}

const Content: React.FunctionComponent<ContentProps> = ({ capabilities }) => {
  const header = (capability: Capability) => (
    <Grid.Container padding="0 30px">
      <Grid.Row>
        <Grid.Unit df={3} withoutPadding={true}>
          <CapabilitySvg capability={capability.frontmatter.id} />
        </Grid.Unit>
        <Grid.Unit df={9} withoutPadding={true}>
          <H as="h2">{capability.frontmatter.displayName}</H>
          <div>
            <Button.Emphasized>View Roadmap</Button.Emphasized>
          </div>
        </Grid.Unit>
      </Grid.Row>
    </Grid.Container>
  );

  const content = (capability: Capability) => (
    <ReactMarkdown source={capability.rawMarkdownBody} />
  );

  return (
    <ContentWrapper>
      {capabilities.map(capability => (
        <>
          <Header>{header(capability)}</Header>
          <StyledReactMarkdown>{content(capability)}</StyledReactMarkdown>
        </>
      ))}
    </ContentWrapper>
  );
};

export default Content;
