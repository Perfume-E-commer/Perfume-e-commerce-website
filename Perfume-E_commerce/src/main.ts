import './assets/main.css'

import { createApp, onMounted } from 'vue'
import { createPinia } from 'pinia'
import 'flowbite'

import App from './App.vue'
import router from './router'

import VueApexCharts from 'vue3-apexcharts'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(Toast);
app.use(VueApexCharts)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})


app.mount('#app')
