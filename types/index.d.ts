export interface DgPositionPx {
    left: string;
    top: string;
    width: string;
    height: string;
}
export interface DgPosition {
    left: number;
    top: number;
    width: number;
    height: number;
}
export interface DgGridInfo {
    rowHeight: number;
    colWidth: number;
}
export interface DgNodeItem {
    id: string | number;
    rowStart: number;
    colStart: number;
    rowSpan: number;
    colSpan: number;
    [key: string]: any;
}
export type DgPositionType = 'left' | 'top' | 'width' | 'height';
