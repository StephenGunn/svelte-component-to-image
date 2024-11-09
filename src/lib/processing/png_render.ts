// Take SVG and render it into a PNG
import { Resvg } from '@resvg/resvg-js';

export const png_render = async (svg: string, options: ResvgOptions) => {
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
	} catch (error) {
		// gods please forgive me for this, I know I have sinned
		throw error;
	}
};
