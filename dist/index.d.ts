export declare const image_from_component: (component: any, options: RenderOptions) => Promise<Buffer | undefined>;
export type RenderOptions = {
    width: number;
    height: number;
    props?: {
        [key: string]: any;
    };
    fonts: FontOptions[];
    debug?: boolean;
};
