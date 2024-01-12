import { createApp } from 'vue'
import App from './App.vue'
import ui from '@/ui';
import router from './router/router';

const app = createApp(App);

// UI Component register
ui.forEach(ui => {
  app.component(ui.name, ui)
})


app
  // через use можно подключить любые плагины и библиотеки
  .use(router)
  .mount('#app')
