import './global.d.ts';
export interface RenderOptions {
    width: number;
    height: number;
    props?: {
        [key: string]: any;
    };
    fonts: FontOptions[];
    debug?: boolean;
}
export interface FontOptions {
    name: string;
    url?: string;
    weight?: number;
    style?: string;
    data?: Buffer | ArrayBuffer;
}
