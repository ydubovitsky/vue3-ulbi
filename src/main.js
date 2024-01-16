import { createApp } from 'vue'
import App from './App.vue'
import ui from '@/ui';
import directives from '@/directives';
import router from '@/router/router';
import store from '@/store';

const app = createApp(App);

// UI Component register
ui.forEach(ui => {
  app.component(ui.name, ui)
})


directives.forEach(directive => {
  app.directive(directive.name, directive);
})

app
  // через use можно подключить любые плагины и библиотеки
  .use(router)
  .use(store)
  .mount('#app')
