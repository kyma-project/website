const config = require("./config");

const loadDocs = require("./documentation");

const main = async config => {
  await loadDocs(config);
};

(async () => {
  try {
    await main(config);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
