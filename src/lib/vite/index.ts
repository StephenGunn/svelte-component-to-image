import type { Plugin } from 'vite';

export function svelte_component_to_image(): Plugin {
	return {
		name: 'vite-plugin-svelte-component-to-image',
		config() {
			return {
				ssr: {
					// add this library to the external list so that it is not bundled
					// in the server bundle, since resvg can't be handled by Vite
					external: ['svelte-component-to-image']
				}
			};
		}
	};
}
