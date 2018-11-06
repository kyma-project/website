import React from "react";
import { Text, Link } from "./styled";

const LinkAndText = ({ text, url, internal }) => {
  if (text) {
    if (url) {
      return (
        <Text>
          {text}
          <Link href={url} target={internal ? "_self" : "_blank"}>
            {"Read more"}
          </Link>
        </Text>
      );
    }
    return <Text>{text}</Text>;
  }
  console.error("Provide valid text for banner!");
  return null;
};

export default LinkAndText;
