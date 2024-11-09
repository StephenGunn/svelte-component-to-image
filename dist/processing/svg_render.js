import satori from 'satori';
import { get_font_as_buffer } from '../font-handling/index.js';
export const svg_render = async (nodes, options) => {
    // build options object for satori
    let satori_options = {
        width: options.width,
        height: options.height,
        fonts: []
    };
    console.log('nodes', nodes);
    console.log('options', options);
    // render each font into an array buffer
    if (options.fonts.length > 0) {
        let rendered_fonts = [];
        for (const font of options.fonts) {
            if (!font.url)
                console.error();
            rendered_fonts.push({
                name: font.name,
                data: await get_font_as_buffer(font.url),
                weight: font.weight,
                style: font.style
            });
        }
        if (rendered_fonts.length !== options.fonts.length)
            console.error('There was a problem rendering a font.');
        satori_options = {
            width: options.width,
            height: options.height,
            fonts: rendered_fonts
        };
    }
    // do the rendering
    const svg = await satori(nodes, satori_options);
    return svg;
};
