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

type Options = {
    width: number
    height: number
}
