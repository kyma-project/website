const yaml = require("js-yaml");

module.exports = json => {
  return yaml.safeLoad(json);
};
