// Take SVG and render it into a PNG
import { Resvg } from '@resvg/resvg-js';

export const png_render = async (svg: string, options: ResvgOptions) => {
	console.log('svg', svg);
	const resvg = new Resvg(svg, {
		fitTo: {
			mode: 'width',
			value: options.width
		}
	});
	const pngData = resvg.render();
	const pngBuffer = pngData.asPng();

	return pngBuffer;
};
