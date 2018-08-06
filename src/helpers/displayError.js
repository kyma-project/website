import ui from "../locales/en/UI.json";

export const displayError = err => {
  if (!err.response) {
    return ui.errors.general;
  }

  const statusCode = err.response.status;
  const text = ui.errors[statusCode];

  if (!text) {
    return `${err.response.status} - ${err.response.statusText}`;
  }

  return text;
};
