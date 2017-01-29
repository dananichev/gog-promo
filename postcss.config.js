module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-font-magician')({
      variants: {
        'Open Sans': {
          '300': ['woff, woff2'],
          '400': ['woff, woff2'],
          '600': ['woff, woff2'],
          '700': ['woff, woff2'],
        },
        'DS-Digital': {
          '700': ['woff, woff2'],
        },
      }
    }),
    require('postcss-url'),
    require('postcss-cssnext'),
    require('postcss-clean'),
    require('postcss-reporter'),
  ],
};
