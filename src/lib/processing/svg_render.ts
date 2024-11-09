// Take satori friendly HTML and render it to an SVG
import type { RenderOptions } from '$lib/index.js';
import satori from 'satori';
import { get_font_as_buffer } from '../font-handling/index.js';

export const svg_render = async (nodes: VNode, options: RenderOptions) => {
	// build options object for satori
	let satori_options: SatoriOptions = {
		width: options.width,
		height: options.height,
		fonts: []
	};

	// render each font into an array buffer
	if (options.fonts.length > 0) {
		let rendered_fonts: FontOptions[] = [];
		for (const font of options.fonts) {
			if (!font.url) console.error();
			rendered_fonts.push({
				name: font.name,
				data: await get_font_as_buffer(font.url!),
				weight: font.weight,
				style: font.style
			});
		}

		if (rendered_fonts.length !== options.fonts.length) {
			throw new Error('There was a problem rendering a font.');
		}

		satori_options = {
			width: options.width,
			height: options.height,
			fonts: rendered_fonts
		};
	}

	if (options.debug) {
		console.log('NUMBER OF FONT FILES RENDERED:', satori_options.fonts.length);
		console.log('WIDTH:', satori_options.width);
		console.log('HEIGHT:', satori_options.height);
	}

	// do the rendering
	const svg = await satori(nodes, satori_options);

	if (options.debug && svg) {
		// something to do a basic check to see if the SVG is valid
		console.log('An SVG was rendered successfully.');
	}

	if (!svg) {
		throw new Error('There was a problem rendering the SVG.');
	}

	return svg;
};
