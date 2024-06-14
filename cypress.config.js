const { defineConfig } = require("cypress");

module.exports = defineConfig({
  failOnStatusCode: false,
  e2e: {
  
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
