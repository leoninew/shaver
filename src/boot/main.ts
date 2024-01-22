import { boot } from 'quasar/wrappers'
import { install as VueMonacoEditorPlugin } from '@guolao/vue-monaco-editor'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ( { app, router } ) => {
  // something to do
  app.use(VueMonacoEditorPlugin, {
    paths: {
      // The recommended CDN config
      vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.43.0/min/vs'
    },
  })
})
