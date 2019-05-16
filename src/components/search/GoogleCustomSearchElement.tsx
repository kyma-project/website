import React, { useEffect } from "react";

import { GOOGLE_SEARCH_ENGINE_ID } from "@common/constants";

import { GoogleCustomSearchElementWrapper } from "./styled";

const GoogleCustomSearchElement: React.FunctionComponent = () => {
  const initialGCSE = () => {
    const gcse = document.createElement("script");
    gcse.type = "text/javascript";
    gcse.async = true;
    gcse.src =
      (document.location.protocol === "https:" ? "https:" : "http:") +
      "//cse.google.com/cse.js?cx=" +
      GOOGLE_SEARCH_ENGINE_ID;
    const s = document.getElementsByTagName("script")[0];
    if (s && s.parentNode) {
      s.parentNode.insertBefore(gcse, s);
    }
  };

  useEffect(() => {
    const htmlTag = document.querySelector("html");
    if (htmlTag) {
      htmlTag.classList.add("search");
    }
    initialGCSE();
  }, []);

  return (
    <GoogleCustomSearchElementWrapper>
      <div
        className="gcse-search"
        data-linkTarget="_self"
        data-queryParameterName="google"
      />
    </GoogleCustomSearchElementWrapper>
  );
};

export default GoogleCustomSearchElement;
