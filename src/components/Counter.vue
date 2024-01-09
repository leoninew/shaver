<template>
  <div>
    <h2>{{ msg }}</h2>
    <button type='button' @click='onClick'>count is {{ count }}</button>
  </div>
</template>

<script setup lang='ts'>
  import { onMounted, ref } from 'vue'
  import { useSessionStore } from '@/stores'

  defineProps<{ msg: string }>()
  const sessionStore = useSessionStore()
  const count = ref(0)

  onMounted(() => {
    count.value = parseInt(sessionStore.get('count')) || 0
  })

  const onClick = () => {
    count.value += 1
    sessionStore.set('count', count.value)
  }
</script>