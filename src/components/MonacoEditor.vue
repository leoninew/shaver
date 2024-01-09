<template>
  <div>
    <vue-monaco-editor
        v-bind:value="props.text"
        v-bind:language="props.language"
        v-bind:options="editorOptions"
        @mount="mounted"
        @change="changed"
        theme="vs"
        height="700px"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref, shallowRef } from "vue";

  const props = defineProps<{ text: string, language: string }>();
  const emit = defineEmits();

  const editorRef = shallowRef();
  const status = ref({
    folded: false,
  })

  // https://microsoft.github.io/monaco-editor/docs.html#interfaces/editor.IStandaloneEditorConstructionOptions.html
  const editorOptions = {
    automaticLayout: true,
    formatOnType: false,
    formatOnPaste: false,
  };

  const mounted = async (editor: any) => {
    editorRef.value = editor;
    emit('mounted');
  };

  const changed = (value: string | undefined, event: any) => {
    emit('update:text', value ?? '')
    emit('changed', value ?? '');
  };


  const formatDoc = async () => {
    // https://github.com/microsoft/monaco-editor/issues/32
    await editorRef.value?.getAction('editor.action.formatDocument').run();
  };

  const foldAll = async () => {
    // https://stackoverflow.com/questions/64430041/get-a-list-of-monaco-commands-actions-ids
    if (status.value.folded) {
      await editorRef.value?.getAction('editor.unfoldAll').run()
      status.value.folded = false;
    }
    else {
      await editorRef.value?.getAction('editor.foldAll').run()
      status.value.folded = true;
    }
  }

  defineExpose({ formatDoc, foldAll });
</script>
