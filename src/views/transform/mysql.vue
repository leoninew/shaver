<template>
  <a-row :gutter="8">
    <a-col :span="12">
      <a-card title="JSON">
        <template #extra>
          <a-button type="text" :icon="h(AlignLeftOutlined)" @click="formatDoc" />
          <a-button type="text" :icon="h(DeleteOutlined)" @click="removeAll" />
        </template>
      </a-card>
      <MonacoEditor v-model:text="input" language="json" v-on:changed="changed" ref="inputEditor" />
    </a-col>
    
    <a-col :span="12">
      <a-card title="MySQL">
        <template #extra>
          <a-button type="text" :icon="h(SettingOutlined)" @click="showOptions=true" />
          <a-button type="text" :icon="h(CopyOutlined)" @click="copyOutput" />
        </template>
      </a-card>
      <MonacoEditor v-bind:text="output" language="mysql" />
    </a-col>
  </a-row>

  <a-row :gutter="8">
    <a-col :span="24">
      <a-alert v-if="state" :message="state" type="error" show-icon />
    </a-col>
  </a-row>

  <a-drawer
      v-model:open="showOptions"
      title="Options"
      placement="right"
      style="position:absolute"
      :closable="false"
      @close="hideOptions"
  >
    <h3>Common</h3>
    <a-form layout="vertical">
      <a-form-item label="NotNull">
        <a-checkbox v-model:checked="options.useNotNull">use 'NOT NULL' as much as possible</a-checkbox>
      </a-form-item>
      <a-form-item label="String type">
        <a-checkbox v-model:checked="options.useVarchar" disabled>use VARCHAR rather then TEXT</a-checkbox>
      </a-form-item>
    </a-form>
  </a-drawer>
</template>

<script setup lang="ts">
  import { h, onMounted, ref, toRaw } from "vue";
  import { AlignLeftOutlined, CopyOutlined, DeleteOutlined, SettingOutlined } from '@ant-design/icons-vue';
  import transform from "@/libs/transform";
  import clipboard from '@/libs/clipboard';
  import MonacoEditor from "@/components/MonacoEditor.vue";
  import { useLocalStore } from "@/stores";

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

  const removeAll = async () => {
    input.value = '';
  }

  const copyOutput = async () => {
    await clipboard(output.value);
  }

</script>