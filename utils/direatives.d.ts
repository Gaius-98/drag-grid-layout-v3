import { DirectiveBinding } from 'vue';
export interface HTMLElementClickEvent extends HTMLElement {
    clickOutsideEvent: (event: MouseEvent) => void;
}
export declare const clickOutside: {
    mounted(el: HTMLElementClickEvent, binding: DirectiveBinding): void;
    unmounted(el: HTMLElementClickEvent): void;
};
