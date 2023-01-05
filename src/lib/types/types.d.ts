type VNode = {
    type: string
    props: {
        style?: Record<string, any>
        children?: string | VNode | VNode[]
        [prop: string]: any
    }
}

type ResvgOptions = {
    width:  number
}

type SatoriOptions = RenderOptions & {}


type Font = {
    name: string
    url: string
    weight: number
    style: string
}

declare type Weight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
declare type Style = 'normal' | 'italic'
interface FontOptions {
    data?: Buffer | ArrayBuffer
    name: string
    weight?: Weight
    style?: Style
    url?: string
}

