<template>
  <a-layout-content>
    <div>VITE_BACKEND_BASEURL={{ VITE_BACKEND_BASEURL }}</div>
  </a-layout-content>
</template>

<script lang='ts' setup>
  const VITE_BACKEND_BASEURL = import.meta.env.VITE_BACKEND_BASEURL;
</script>