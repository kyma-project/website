import React from "react";
import { Text, Link } from "./styled";

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
          <Link href={url} target={openInNewTab ? "_self" : "_blank"}>
            {"Read more"}
          </Link>
        </>
      )}
    </Text>
  );
};

export default SlideContent;
