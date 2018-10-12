import React from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
  background-color: #0b74de;
`;

const BannerLink = styled.a`
  color: #fff;
  text-decoration: underline;
`;

const MainRow = styled.p`
  padding: 20px 15px;
  margin: 0 auto;
  text-align: center;
  vertical-align: center;
  align-items: center;
  justify-content: center;
  font-family: Poppins;
  font-size: 16px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.63;
  letter-spacing: normal;
  text-decoration: none;
  color: #fff;
`;

const Banner = () => {
  return (
    <Wrapper>
      <MainRow>
        Join us for the &nbsp;<BannerLink href="https://kyma-project.io/blog/blog-post-kyma-at-teched/" target="_blank">SAP TechEd, Barcelona, October 23-25</BannerLink>
      </MainRow>
    </Wrapper>
  );
};

export default Banner;
