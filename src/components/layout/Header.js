import React from "react";
import NavigationContainer from "./Navigation.container";
import Link from "gatsby-link";

const Header = () => {
  return (
    <header className="bg-h">
      <div className="container">
        <Link className="home-link" to="/">
          <svg
            className="sprite-icon sprite-icon--173 sprite-icon--primary"
            role="img"
            aria-labelledby="logoTitle"
          >
            <title id="logoTitle">Kyma Logo</title>
            <use xlinkHref="#logo" />
          </svg>
        </Link>

        <NavigationContainer />
      </div>
    </header>
  );
};

export default Header;
