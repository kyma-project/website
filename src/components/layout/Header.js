import React from "react";
import NavigationContainer from "./Navigation.container";
import Link from "gatsby-link";

const Header = ({headerClassName, logoClassName}) => {
  return (
    <header className={`bg-h ${headerClassName ? headerClassName : ''}`}>
      <div className="container">
        <Link className="home-link" to="/">
          <svg
            className={`sprite-icon sprite-icon--173 sprite-icon--primary ${logoClassName ? logoClassName : ''}`}
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
