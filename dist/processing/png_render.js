// Take SVG and render it into a PNG
import { Resvg } from '@resvg/resvg-js';
export const png_render = async (svg, options, debug) => {
    try {
        const resvg = new Resvg(svg, {
            fitTo: {
                mode: 'width',
                value: options.width
            }
        });
        const pngData = resvg.render();
        const pngBuffer = pngData.asPng();
        return pngBuffer;
    }
    catch (error) {
        if (debug) {
            console.error('An error happened in the PNG_RENDER function');
        }
        // gods please forgive me for this, I know I have sinned
        throw error;
    }
};
