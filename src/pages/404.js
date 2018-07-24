import React from "react";

import DefaultLayout from "../components/layout/DefaultLayout";

const NotFoundPage = () => {
  return (
    <DefaultLayout pageId="not-found">
      <p>404 - Page not found</p>
    </DefaultLayout>
  );
};

export default NotFoundPage;