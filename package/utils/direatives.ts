import type { DirectiveBinding } from "vue";
export interface HTMLElementClickEvent extends HTMLElement {
    clickOutsideEvent: (event:MouseEvent) => void;
}
export const clickOutside = {
    mounted(el:HTMLElementClickEvent, binding:DirectiveBinding) {
        el.clickOutsideEvent =  (event:MouseEvent) => {
            console.log(event.target ,'mounted')
            if (!(el === event.target || el.contains(event.target as HTMLElement))) {
                binding.value();
            }
        };
        document.body.addEventListener('click', el.clickOutsideEvent);
    },
    unmounted(el:HTMLElementClickEvent) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
    },
};