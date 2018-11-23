import React from "react";
import { Text, StyledLink } from "./styled";
import { Link } from "gatsby";
const SlideContent = ({ text, url, openInNewTab }) => {
  if (!text) {
    console.error("Provide valid text for banner!");
    return null;
  }
  return (
    <Text>
      {text}
      {url && (
        <>
          {" "}
          {openInNewTab ? (
            <StyledLink as="a" href={url} target="_blank">
              {"Read more"}
            </StyledLink>
          ) : (
            <StyledLink as={Link} to={url}>
              {"Read more"}
            </StyledLink>
          )}
        </>
      )}
    </Text>
  );
};

export default SlideContent;
