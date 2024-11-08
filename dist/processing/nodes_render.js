// Take a svelte component, render it down to html, inline the styles
// then return a set of satori ready nodes
import pkg from 'juice';
const { juiceResources } = pkg;
import { html as to_satori_nodes } from 'satori-html';
import { render } from 'svelte/server';
export const nodes_render = async (Component, props) => {
    // render the body and the head
    const { head, body } = render(Component, { props });
    if (!head) {
        console.error('CSS not being returned from the Svelte component. Please add <svelte:options css="injected" /> to the top of your image component.');
    }
    const inline_html = await new Promise((resolve, reject) => {
        juiceResources(head + body, {}, (err, result) => (err ? reject(err) : resolve(result)));
    });
    // render satori friendly HTML and return it
    const satori_nodes = to_satori_nodes(inline_html);
    return satori_nodes;
};
