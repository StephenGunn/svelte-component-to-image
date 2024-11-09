// Take a svelte component, render it down to html, inline the styles
// then return a set of satori ready nodes
import juice from 'juice';
import { html as to_satori_nodes } from 'satori-html';
import { render } from 'svelte/server';

export const nodes_render = async (
	Component: any,
	props?: {
		[key: string]: any;
	}
) => {
	// render the body and the head
	const { head, body } = render(Component, { props });

	if (!head) {
		throw new Error(
			'CSS not being returned from the Svelte component. Please add <svelte:options css="injected" /> to the top of your image component.'
		);
	}

	if (!body) {
		throw new Error('No HTML returned from component.');
	}

	const inline_html: string = juice(head + body, {});

	if (!inline_html) {
		throw new Error('Trouble inlining the CSS.');
	}

	// render satori friendly HTML and return it
	const satori_nodes = to_satori_nodes(inline_html);

	if (!satori_nodes) {
		throw new Error('Trouble converting HTML to Satori nodes');
	}

	return satori_nodes;
};
