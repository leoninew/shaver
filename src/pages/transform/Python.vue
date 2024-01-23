<template>
  <q-splitter v-bind:model-value="50">
    <template v-slot:before>
      <div class="q-pa-md">
        <q-toolbar class="text-primary">
          <q-toolbar-title>JSON</q-toolbar-title>
          <q-btn flat round dense icon="format_align_left" @click="formatDoc" />
          <q-btn flat round dense icon="delete" @click="clearInput" />
        </q-toolbar>
        <MonacoEditor v-model:text="input" language="json" v-on:changed="changed" ref="inputEditor" />
      </div>
    </template>

    <template v-slot:after>
      <div class="q-pa-md">
        <q-toolbar class="text-primary">
          <q-toolbar-title>Python</q-toolbar-title>
          <q-btn flat round dense icon="settings" @click="showOptions=!showOptions" disable />
          <q-btn flat round dense icon="content_copy" @click="copyOutput" />
        </q-toolbar>
        <MonacoEditor v-bind:text="output" language="python" />
      </div>
    </template>
  </q-splitter>
</template>

<script setup lang="ts">
  import { onMounted, ref, toRaw } from 'vue'
  import transform from 'src/libs/transform/python'
  import clipboard from 'src/libs/clipboard'
  import MonacoEditor from 'src/components/MonacoEditor.vue'
  import { useLocalStore } from 'src/stores/localStorage'
  import { onBeforeRouteUpdate, useRoute } from 'vue-router'

  const route = useRoute()
  const localStore = useLocalStore()
  const input = ref('')
  const output = ref('')
  const state = ref('')
  const showOptions = ref(false)
  const options = ref<Record<string, boolean>>({})
  const inputEditor = ref<any>()

  onMounted(async () => {
    const keys = Object.keys(options.value)
    for (const key of keys) {
      localStore.assign(`/transform/java/${key}`,
        val => options.value[key] = val)
    }

    // https://en.wikipedia.org/wiki/JSON
    input.value = localStore.get('/transform/mysql/input')
      || JSON.stringify({ "id": 1, "userId": 1, "title": "delectus aut autem", "completed": false, "created": "2024-01-06T13:39:32.006Z" }, null, 2);
    await changed(input.value);
  });

  onBeforeRouteUpdate(async (to) => {
    await changed(input.value, to.query.kind)
  })

  const changed = async (value: string, kind?: any) => {
    state.value = ''
    const rawOptions = toRaw(options.value)
    localStore.set('/transform/input', value)

    try {
      const json = JSON.parse(value)
      output.value = Array.from(transform(json, rawOptions)).join('\n') ?? ''
    } catch (err) {
      if (err instanceof SyntaxError) {
        state.value = err.message
      } else {
        throw err
      }
    }
  }

  const hideOptions = async () => {
    await changed(input.value)
  }

  const formatDoc = async () => {
    await inputEditor.value.formatDoc()
  }

  const clearInput = async () => {
    input.value = ''
  }

  const copyOutput = async () => {
    await clipboard(output.value)
  }

</script>
