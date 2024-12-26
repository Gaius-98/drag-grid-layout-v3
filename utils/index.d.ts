import { DgGridInfo, DgPosition, DgPositionPx } from '../types';
export declare const debounce: (func: Function, wait: number) => (...args: any[]) => void;
export declare const throttle: (func: Function, wait: number) => (...args: any[]) => void;
/**
 * 获取元素位置及大小信息
 * @param el
 * @returns
 */
export declare const getElePosition: (el: HTMLElement) => DgPositionPx;
export declare const position2Grid: (posisitonInfo: DgPositionPx, gridInfo: DgGridInfo) => string;
export declare const transformGrid: (posisitonInfo: DgPositionPx, gridInfo: DgGridInfo) => {
    rowStart: number;
    rowSpan: number;
    colSpan: number;
    colStart: number;
};
export declare const transformObjectStr: (posisitonInfo: DgPositionPx) => DgPosition;
/**
 * 提取grid布局参数
 * @param gridArea
 * @returns
 */
export declare const compileGridInfo: (gridArea: string) => {
    rowStart: number;
    colStart: number;
    rowSpan: number;
    colSpan: number;
} | undefined;
/**
 * 检测两个元素是否重叠
 * @param elem1
 * @param elem2
 * @returns
 */
export declare const isOverlapping: (elem1: HTMLElement, elem2: HTMLElement) => boolean;
export declare const getRelativePosition: (el: HTMLElement) => {
    left: number;
    top: number;
    width: number;
    height: number;
};
export declare const collides: (l1: any, l2: any) => boolean;
export declare const getFirstCollision: (list: any[], item: any) => any;
