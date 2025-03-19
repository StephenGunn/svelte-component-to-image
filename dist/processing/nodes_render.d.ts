interface VNode {
    type: string;
    props: {
        style?: Record<string, any>;
        children?: string | VNode | VNode[];
        [prop: string]: any;
    };
}
export declare const nodes_render: (Component: any, props?: {
    [key: string]: any;
}, debug?: boolean) => Promise<VNode>;
export {};
