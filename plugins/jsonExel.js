import Vue from 'vue';
import vueJsonExcel from 'vue-json-excel';
Vue.use(vueJsonExcel)
Vue.config.productionTip = false;
Vue.component('downloadExcel', vueJsonExcel);