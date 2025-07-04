// component to image pipeline
import { nodes_render } from './processing/nodes_render.js';
import { svg_render } from './processing/svg_render.js';
import { png_render } from './processing/png_render.js';
import type { RenderOptions, FontOptions } from './types/types.js';

export const image_from_component = async (
  component: any,
  options: RenderOptions
): Promise<Buffer | undefined> => {
  try {
    // the major steps
    const nodes = await nodes_render(component, options.props, options.debug);
    const svg = await svg_render(nodes, options);
    const png = await png_render(svg, options, options.debug ?? false);

    return png;
  } catch (error) {
    console.error(error);
  }

  return undefined;
};

// Export types
export type { RenderOptions, FontOptions };
