import React from "react";
import styled, { keyframes } from "styled-components";

const skBounce = keyframes`
  0%, 100% {
	  transform: scale(0.0);
  }

  50% {
	  transform: scale(1.0);
	}
`;

const Spinner = styled.div`
  width: 75px;
  height: 75px;
  margin: 0 auto;
  position: relative;
`;

const DoubleBounce1 = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #3298ff;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  animation: ${skBounce} 2s infinite ease-in-out;
`;

const DoubleBounce2 = styled(DoubleBounce1)`
  animation-delay: -1s;
`;

const LoadingIndicator = ({ className }) => (
  <Spinner className={className}>
    <DoubleBounce1 />
    <DoubleBounce2 />
  </Spinner>
);

export default LoadingIndicator;
