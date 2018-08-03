import React from "react";
import Link from "gatsby-link";
import ui from "../../locales/en/UI.json";

import NavigationContainer from "./Navigation.container";

const Header = ({ headerClassName, logoClassName, t }) => {
  return (
    <header className={`bg-h ${headerClassName ? headerClassName : ""}`}>
      <div className="container">
        <Link className="home-link" to="/">
          <svg
            className={`sprite-icon sprite-icon--173 sprite-icon--primary ${
              logoClassName ? logoClassName : ""
            }`}
            role="img"
            aria-labelledby="logoTitle"
          >
            <title id="logoTitle">{ui.metadata.title}</title>
            <use xlinkHref="#logo" />
          </svg>
        </Link>

        <NavigationContainer />
      </div>
    </header>
  );
};

export default Header;
