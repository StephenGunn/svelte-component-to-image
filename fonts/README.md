# Pre-approved Fonts

This directory contains fonts that have been tested and work well with svelte-component-to-image.

## Using These Fonts

1. Copy the font files you want to use to your project's `static` directory
2. Reference them in your image generation endpoint:

```js
const options: RenderOptions = {
  fonts: [
    {
      name: 'YourFontName',
      url: `${url.origin}/your-font.ttf`,
      weight: 400,
      style: 'normal'
    }
  ]
};
```

## Contributing Fonts

Feel free to contribute fonts that work well with this library! Please ensure:

1. The font is properly licensed for redistribution
2. Include license information in your PR
3. Test that the font renders correctly with Satori
4. Use descriptive filenames (lowercase, no spaces)

Note: WOFF2 format is not currently supported by Satori.