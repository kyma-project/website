import React from "react";
import { Text, StyledLink } from "./styled";
import { Link } from "gatsby";
import UI from "../../../locales/en/UI.json";
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
              {UI.navigation.readMore}
            </StyledLink>
          ) : (
            <StyledLink as={Link} to={url}>
              {UI.navigation.readMore}
            </StyledLink>
          )}
        </>
      )}
    </Text>
  );
};

export default SlideContent;
