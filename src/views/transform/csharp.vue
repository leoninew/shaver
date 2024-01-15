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
      <a-card title="C#">
        <template #extra>
          <a-button type="text" :icon="h(SettingOutlined)" @click="showOptions=true" />
          <a-button type="text" :icon="h(CopyOutlined)" @click="copyOutput" />
        </template>
      </a-card>
      <MonacoEditor v-bind:text="output" language="csharp" />
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
      <a-form-item label="Attributes">
        <a-checkbox v-model:checked="options.keepBrief">Use as little as possible</a-checkbox>
      </a-form-item>
      <a-form-item label="Type">
        <a-checkbox v-model:checked="options.useClrType">Use CLR type</a-checkbox>
      </a-form-item>
    </a-form>

    <h3>Json.Net</h3>
    <a-form layout="vertical">
      <a-form-item label="Attributes">
        <a-checkbox v-model:checked="options.useJsonProperty">Add JsonProperty</a-checkbox>
      </a-form-item>
      <a-form-item label="ContractResolver">
        <a-checkbox v-model:checked="options.useCamelCasePropertyNamesContractResolver">Use CamelCasePropertyNamesContractResolver</a-checkbox>
      </a-form-item>
    </a-form>

    <h3>System.Text.Json</h3>
    <a-form layout="vertical">
      <a-form-item label="Attributes">
        <a-checkbox v-model:checked="options.useJsonPropertyName">Use JsonPropertyName</a-checkbox>
      </a-form-item>
      <a-form-item label="PropertyNamingPolicy">
        <a-checkbox v-model:checked="options.useCamelCaseJsonNamingPolicy">Use JsonNamingPolicy.CamelCase</a-checkbox>
      </a-form-item>
    </a-form>

    <h3>PetaPoco</h3>
    <a-form layout="vertical">
      <a-form-item label="Attributes">
        <a-checkbox v-model:checked="options.usePetaPoco">Use PetaPoco</a-checkbox>
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
  const options = ref<Record<string, boolean>>({
    keepBrief: true,
    useClrType: false,
    useJsonProperty: true,
    useCamelCasePropertyNamesContractResolver: true,
    useJsonPropertyName: false,
    useCamelCaseJsonNamingPolicy: false,
    usePetaPoco: false,
  });
  const inputEditor = ref<any>();

  onMounted(async () => {
    const keys = Object.keys(options.value);
    for (const key of keys) {
      localStore.assign(`/transform/csharp/${key}`,
          val => options.value[key] = val);
    }

    // https://en.wikipedia.org/wiki/JSON
    input.value = localStore.get('/transform/input')
        || JSON.stringify({
          "first_name": "John",
          "last_name": "Smith",
          "is_alive": true,
          "age": 27,
          "address": { "street_address": "21 2nd Street", "city": "New York", "state": "NY", "postal_code": "10021-3100" },
          "phone_numbers": [{ "type": "home", "number": "212 555-1234" }, { "type": "office", "number": "646 555-4567" }],
          "children": ["Catherine", "Thomas", "Trevor"],
          "spouse": null
        }, null, 2);
    await changed(input.value);
  });

  const changed = async (value: string) => {
    state.value = '';
    const rawOptions = toRaw(options.value);
    localStore.set('/transform/input', value);

    try {
      const json = JSON.parse(value);
      output.value = transform.toCSharp(json, rawOptions) ?? '';
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
    const keys = Object.keys(options.value);
    for (const key of keys) {
      localStore.set(`/transform/csharp/${key}`, options.value[key]);
    }
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