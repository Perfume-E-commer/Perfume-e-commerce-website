import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import VueApexCharts from 'vue3-apexcharts'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

// import Datepicker from 'flowbite-datepicker'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueApexCharts)
// app.use(PrimeVue);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})

app.mount('#app')
