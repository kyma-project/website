import React from "react";
import Link from "gatsby-link";
import landingPage from "../../locales/en/LandingPage.json";
import WhatIsSvg from "./features/WhatIs";

const WhatIs = () => {
  const sectionPrefix = "whatIs";
  const headline = landingPage[sectionPrefix].headline;
  const url = landingPage[sectionPrefix].url;
  const action = landingPage[sectionPrefix].action;
  const blog = landingPage[sectionPrefix].blog || {};
  const paragraphs = landingPage[sectionPrefix].paragraphs || [];

  const videoLinkParagraph = (
    <div>
      <p>
        <Link className="link-blog" to={blog.link.url}>
          <span>{blog.link.name}</span>
        </Link>{" "}
        {blog.paragraph[0]}
      </p>
    </div>
  );
  return (
    <div className="row row--space-between row--sm-align-center">
      <div className="col-6 col-md-9 col-sm-12 align--center">
        <h2>{headline}</h2>
        <div>
          {paragraphs.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
          {videoLinkParagraph}
          <Link className="btn btn-github" to={url}>
            <span>{action}</span>
          </Link>
        </div>
      </div>
      <div className="col-6 col-md-9 col-sm-12">
        <WhatIsSvg />
      </div>
    </div>
  );
};

export default WhatIs;
