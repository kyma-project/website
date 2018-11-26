import React from "react";
import { Text, StyledLink } from "./styled";
import { Link } from "gatsby";
import UI from "../../../locales/en/UI.json";
const SlideContent = ({ text, url, openInNewTab }) => {
  if (!text) {
    console.error("Provide valid text for banner!");
    return null;
  }

  let linkProps;
  if (openInNewTab) {
    linkProps = {
      as: "a",
      href: url,
      target: "_blank",
    };
  } else {
    linkProps = {
      as: Link,
      to: url,
    };
  }

  return (
    <Text>
      {text}
      {url && (
        <>
          {" "}
          <StyledLink {...linkProps}>{UI.navigation.readMore}</StyledLink>
        </>
      )}
    </Text>
  );
};

export default SlideContent;
