<template>
  <a-config-provider :theme="theme">
    <section id="app">
      <a-layout>
        <a-layout-header>
          <a-menu theme="dark" mode="horizontal">
            <a-menu-item key="/">
              <router-link class="navbar-item" to="/">Home</router-link>
            </a-menu-item>
            <a-menu-item key="/transform">
              <router-link class="navbar-item" to="/transform">Transform</router-link>
            </a-menu-item>
            <a-menu-item key="/about">
              <router-link class="navbar-item" to="/about">About</router-link>
            </a-menu-item>
          </a-menu>
        </a-layout-header>

        <section style="padding: 8px">
          <RouterView />
        </section>
      </a-layout>
    </section>
  </a-config-provider>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import { useRoute, useRouter } from "vue-router";

  // https://www.antdv.com/docs/vue/customize-theme-cn
  const theme = ref({
    token: {
      borderRadius: '3px',
    },
  });

  const router = useRouter();
  const route = useRoute();
</script>