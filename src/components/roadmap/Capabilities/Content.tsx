import React from "react";

import Grid from "@styled/Grid";

import CapabilitySvg from "@components/roadmap/Svg";
import H from "@components/shared/H";
import Button from "@components/shared/Button";
import ReactMarkdown from "@components/shared/ReactMarkdown";

import { ContentWrapper, Header, StyledReactMarkdown } from "./styled";

interface ContentProps {
  displayName: string;
  description: string;
  id: string;
}

const Content: React.FunctionComponent<ContentProps> = ({
  displayName,
  description,
  id,
}) => {
  const header = (
    <Grid.Container padding="0 30px">
      <Grid.Row>
        <Grid.Unit df={3} withoutPadding={true}>
          <CapabilitySvg capability={id} />
        </Grid.Unit>
        <Grid.Unit df={9} withoutPadding={true}>
          <H as="h2">{displayName}</H>
          <div>
            <Button.Emphasized>View Roadmap</Button.Emphasized>
          </div>
        </Grid.Unit>
      </Grid.Row>
    </Grid.Container>
  );

  return (
    <ContentWrapper>
      <Header>{header}</Header>
      <StyledReactMarkdown>
        <ReactMarkdown source={description} />
      </StyledReactMarkdown>
    </ContentWrapper>
  );
};

export default Content;
