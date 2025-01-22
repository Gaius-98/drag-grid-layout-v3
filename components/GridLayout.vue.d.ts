interface DgNodeItem {
    id: string | number;
    rowStart: number;
    colStart: number;
    rowSpan: number;
    colSpan: number;
    [key: string]: any;
}
interface Props {
    list: DgNodeItem[];
    gap?: number;
    rowHeight?: number;
    columns?: number;
}
declare function __VLS_template(): {
    slots: {
        "layout-item"?(_: {
            item: DgNodeItem;
        }): any;
        "drag-handle"?(_: {}): any;
        default?(_: {}): any;
    };
    refs: {
        dgLayoutRef: HTMLDivElement;
        shadowRef: HTMLDivElement;
        dgLayoutVnode: HTMLDivElement;
    };
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "item:click": (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{
    "onItem:click"?: ((...args: any[]) => any) | undefined;
}>, {
    rowHeight: number;
    list: DgNodeItem[];
    gap: number;
    columns: number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
