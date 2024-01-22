<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu"/>
        <q-toolbar-title>
          <q-breadcrumbs-el label="Quasar App" to="/"/>
        </q-toolbar-title>
        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div class="q-pa-md">
        <div class="row">
          <div class="col-2">
            <q-list dense separator>
              <q-item v-for="item in transforms" :to="item.to" active-class="list-item-active">
                <q-item-section>{{ item.title }}</q-item-section>
              </q-item>

              <q-separator spaced/>

              <q-item to="/transform">
                <q-item-section>Transform</q-item-section>
              </q-item>
              <q-item v-ripple to="/about" disable>
                <!--<q-item-section avatar><q-icon name="help"/></q-item-section>-->
                <q-item-section>Help</q-item-section>
              </q-item>
            </q-list>

          </div>
          <div class="col">
            <router-view/>
          </div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
  import { useRoute } from "vue-router";

  const route = useRoute();
  const transforms = [
    {
      to: '/transform/csharp',
      title: 'to C#'
    },
    {
      to: '/transform/java',
      title: 'to JAVA'
    },
    {
      to: '/transform/mysql',
      title: 'to MySQL'
    },
    {
      to: '/transform/typescript',
      title: 'to TypeScript'
    },
    {
      to: '/transform/xml',
      title: 'to XML'
    },
    {
      to: '/transform/yaml',
      title: 'to YAML'
    },
  ]
</script>

<style scoped>
  .list-item-active {
    background: linear-gradient(to right, lightgray, lightgray 50%);
  }
</style>
