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
      },
      custom: {
        'DS-Digital': {
          variants: {
            normal: {
              700: {
                url: {
                  woff2: './src/assets/fonts/ds-digib-webfont.woff2',
                  woff: './src/assets/fonts/ds-digib-webfont.woff',
                },
              },
            },
          },
        },
      }
    }),
    require('postcss-url'),
    require('postcss-cssnext'),
    require('postcss-clean'),
    require('postcss-reporter'),
  ],
};
