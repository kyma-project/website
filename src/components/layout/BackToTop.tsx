import React, { Component } from "react";

import Icon from "@components/shared/Icon";

import { BackToTopIcon } from "./styled";

interface BackToTopState {
  scrollY: number;
}

class BackToTop extends Component<{}, BackToTopState> {
  state: BackToTopState = {
    scrollY: 0,
  };

  componentDidMount() {
    window.addEventListener("scroll", this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  }

  onScroll = () => {
    this.setState({ scrollY: window.scrollY });
  };

  backToTop = () => {
    window.scrollTo(0, 0);
  };

  render() {
    return (
      <BackToTopIcon
        onClick={this.backToTop}
        visibleIcon={this.state.scrollY > 350}
      >
        <Icon iconName="chevron-up" iconPrefix="fas" />
      </BackToTopIcon>
    );
  }
}

export default BackToTop;
