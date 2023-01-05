# svelte-component-to-image

A package for easily rendering .png images from svelte components. Inspired by Vercel's
[`OG Image Generation`](https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation) tool.

Good for rendering dynamic Open Graph images quickly and effeciently without having to use canvas.

## Features

- Renders a normal svelte component as a png
- Component props are supported for dynamic image generation
- Use basic CSS like flexbox and absolute positioning ([See valid CSS](https://github.com/vercel/satori#css))
- Lightweight and fast (doesn't use canvas or puppeteer)
- Load custom fonts: tff, otf, woff accepted (woff2 not accepted currently)

## Alpha

This package is very much in it's alpha stages. While it works, use in production at your own risk.

## Installation

coming soon

## Usage

### Create A Component

You can create a normal component with JS/HTML/CSS. You can pass props or use additional technologies
that require preproccesors like TypeScript or SASS.

Create a +server.ts endpoint to render and serve the image.


## License

MIT

