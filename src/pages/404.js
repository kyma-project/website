import React from "react";
import { Helmet } from "react-helmet";
import LandingLayout from "../components/layout/LandingLayout";

const NotFoundPage = () => {
  return (
    <LandingLayout pageId="not-found">
      <Helmet />
      <div className="container">
        <div className="row">
          <h1 className="col-12 kyma-headline">404</h1>
        </div>
      </div>
    </LandingLayout>
  );
};

export default NotFoundPage;
