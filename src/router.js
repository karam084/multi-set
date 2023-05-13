import { createRouter, createWebHistory } from 'vue-router'

import Page1 from './views/MultiPage1.vue'
import Page2 from './views/MultiPage2.vue'
import Page3 from './views/MultiPage3.vue'
import Page4 from './views/MultiPage4.vue'
import Page5 from './views/MultiPage5.vue'


const routes = [
   { name: 'page1', path: '/', component: Page1 },
   { name: 'page2', path: '/page1', component: Page2 },
   { name: 'page3', path: '/page3', component: Page3 },
   { name: 'page4', path: '/page4', component: Page4 },
   { name: 'page5', path: '/page5', component: Page5 } 

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router