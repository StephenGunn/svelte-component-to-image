// Take a svelte component, render it down to html, inline the styles
// then return a set of satori ready nodes
import juice from 'juice';
import { html as to_satori_nodes } from 'satori-html';
import { render } from 'svelte/server';
export const nodes_render = async (Component, props) => {
    // render the body and the head
    const { head, body } = render(Component, { props });
    if (!head) {
        console.error('CSS not being returned from the Svelte component. Please add <svelte:options css="injected" /> to the top of your image component.');
    }
    console.log('head', head);
    console.log('body', body);
    const inline_html = juice(head + body, {});
    console.log('inline_html', inline_html);
    // render satori friendly HTML and return it
    const satori_nodes = to_satori_nodes(inline_html);
    console.log('satori_nodes', satori_nodes);
    return satori_nodes;
};
