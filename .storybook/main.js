module.exports = {
  "stories": [
    "../apps/formidable/src/stories/**/*.stories.ts",
    "../apps/formidable/src/**/*.stories.ts"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-docs",
    "@storybook/addon-controls",
    "storybook-addon-angular-ivy"
  ],
  "core": {
    "builder": "webpack5"
  }
}
