// Take SVG and render it into a PNG
import { getResvg } from '../resvg-wrapper.js';

export const png_render = async (svg: string, options: ResvgOptions, debug: boolean) => {
	try {
		const Resvg = await getResvg();

		const resvg = new Resvg(svg, {
			fitTo: {
				mode: 'width',
				value: options.width
			}
		});

		const pngData = resvg.render();
		const pngBuffer = pngData.asPng();

		return pngBuffer;
	} catch (error) {
		if (debug) {
			console.error('An error happened in the PNG_RENDER function', error);
		}
		// Re-throw the error for proper handling
		throw error;
	}
};
