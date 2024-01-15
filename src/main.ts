import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import App from './App.vue'
import router from './router'
import { install as VueMonacoEditorPlugin } from '@guolao/vue-monaco-editor'


const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(Antd);
app.use(VueMonacoEditorPlugin, {
    paths: {
        // The recommended CDN config
        vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.43.0/min/vs'
    },
})
app.mount('#app');
