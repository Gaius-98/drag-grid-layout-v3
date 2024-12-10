import GridLayout from "./components/GridLayout.vue";
import type { App } from 'vue'
export {
    GridLayout,
}
const install = (app:App) =>{
    app.component('drag-grid-layout',GridLayout)
}
export default install