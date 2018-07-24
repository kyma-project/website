import React, { Component } from "react";
import { translate } from "react-i18next";

class LanguageSwitcherComponent extends Component {
  constructor(props) {
    super(props);
    const { i18n } = this.props;
    this.state = { language: i18n.language };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({ language: nextProps.i18n.language });
  }

  handleChangeLanguage = lng => {
    const { i18n } = this.props;
    i18n.changeLanguage(lng);
  };

  render() {
    const languages = this.props.items || [];

    return (
      <ul>
        {languages.map(({ code, label }) => {
          return (
            <li key={code}>
              <button onClick={() => this.handleChangeLanguage(code)}>
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    );
  }
}

const LanguageSwitcher = translate("LanguageSwitcher")(
  LanguageSwitcherComponent
);
export default LanguageSwitcher;
