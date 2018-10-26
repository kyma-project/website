import React from "react";
import Link from "gatsby-link";
import ui from "../../locales/en/UI.json";
import bannerData from "./banner-data.json";
import NavigationContainer from "./Navigation.container";
import Banner from "./Banner";

const Header = ({ headerClassName, logoClassName }) => {
  return (
    <>
      {bannerData && bannerData.length > 0 && <Banner />}
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
    </>
  );
};

export default Header;
