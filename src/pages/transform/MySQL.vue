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
          <q-toolbar-title>MySQL</q-toolbar-title>
          <q-btn flat round dense icon="settings" @click="showOptions=!showOptions" />
          <q-btn flat round dense icon="content_copy" @click="copyOutput" />
        </q-toolbar>
        <MonacoEditor v-bind:text="output" language="csharp" />
      </div>
    </template>
  </q-splitter>

  <q-dialog v-model="showOptions" @hide="hideOptions">
    <q-card style="width: 60vw; max-width: 80vw;">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Settings</div>
        <q-space/>
        <q-btn icon="close" flat round dense v-close-popup/>
      </q-card-section>
      <q-card-section>
        <q-form>
          <q-item-label header>Common</q-item-label>
          <q-item-label>
            <q-checkbox v-model="options.useNotNull" label="use more 'NOT NULL'" />
            <q-checkbox v-model="options.useVarchar" label="use VARCHAR rather then TEXT" disable />
          </q-item-label>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
  import { onMounted, ref, toRaw } from "vue";
  import transform from "src/libs/transform";
  import clipboard from 'src/libs/clipboard';
  import MonacoEditor from "src/components/MonacoEditor.vue";
  import { useLocalStore } from "src/stores/localStorage";

  const localStore = useLocalStore();
  const input = ref('');
  const output = ref('');
  const state = ref('');
  const showOptions = ref(false);
  const options = ref({
    useNotNull: true,
    useVarchar: false
  });
  const inputEditor = ref<any>();

  onMounted(async () => {
    // https://en.wikipedia.org/wiki/JSON
    input.value = localStore.get('/transform/mysql/input')
      || JSON.stringify({ "id": 1, "userId": 1, "title": "delectus aut autem", "completed": false, "created": "2024-01-06T13:39:32.006Z" }, null, 2);
    await changed(input.value);
  });

  const changed = async (value: string) => {
    state.value = '';
    const rawOptions = toRaw(options.value);
    localStore.set('/transform/mysql/input', value);

    try {
      const json = JSON.parse(value);
      output.value = transform.toMySQL(json, rawOptions) ?? '';
    } catch (err) {
      if (err instanceof SyntaxError) {
        state.value = err.message;
      }
      else {
        throw err;
      }
    }
  }

  const hideOptions = async () => {
    await changed(input.value);
  }

  const formatDoc = async () => {
    await inputEditor.value.formatDoc();
  }

  const clearInput = async () => {
    input.value = '';
  }

  const copyOutput = async () => {
    await clipboard(output.value);
  }

</script>
