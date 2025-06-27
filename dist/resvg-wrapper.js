let Resvg;
let initError = null;
export async function getResvg() {
    if (initError) {
        throw initError;
    }
    if (!Resvg) {
        try {
            // We dynamically import resvg-js only when needed
            // This helps with bundling issues and allows the module to be external
            const module = await import('@resvg/resvg-js');
            Resvg = module.Resvg || module.default?.Resvg;
            if (!Resvg) {
                throw new Error('@resvg/resvg-js module loaded but Resvg class not found');
            }
        }
        catch (error) {
            const errorMessage = `Failed to load @resvg/resvg-js. 

Make sure it is installed as a dependency (not devDependency) in your project:
  npm install @resvg/resvg-js

If you're deploying to Vercel, you may need to add this to your project's vite.config.js:
  build: {
    rollupOptions: {
      external: ['@resvg/resvg-js']
    }
  }

And this to your svelte.config.js:
  adapter: adapter({
    external: ['@resvg/resvg-js']
  })`;
            console.error(errorMessage);
            initError = new Error(errorMessage);
            throw initError;
        }
    }
    return Resvg;
}
