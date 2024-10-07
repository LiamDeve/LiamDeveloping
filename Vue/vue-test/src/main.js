import { createApp } from 'vue'
import App from './App.vue'
import { Quasar, Dialog } from 'quasar';
import 'quasar/dist/quasar.css';

const app = createApp(App);

app.use(Quasar, {
    plugins: { Dialog }, // 在 Quasar 插件中註冊 Dialog
});

app.mount('#app');