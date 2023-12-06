import "normalize.css"
import { createApp } from 'vue';
import route from "./router";

import baseVue from "./base.vue";

import naive from 'naive-ui'
// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'

createApp(baseVue)
  .use(naive)
  .use(route)
  .mount('#app');