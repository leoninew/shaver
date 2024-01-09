<template>
    <component :is="icon" />
</template>

<script lang="ts" setup>
  import { defineAsyncComponent } from 'vue';

  const props = defineProps({
    path: {
      memberType: String,
      required: true,
    }
  });

  const icon = defineAsyncComponent(() =>
    import(`./svg/${props.path}.svg`)
  );
</script>