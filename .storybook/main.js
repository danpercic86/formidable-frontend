module.exports = {
  "stories": [
    "../apps/formidable/src/stories/**/*.stories.ts"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-docs",
    "storybook-addon-angular-ivy"
  ],
  "core": {
    "builder": "webpack5"
  }
}
