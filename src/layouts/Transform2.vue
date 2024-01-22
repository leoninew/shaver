<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu"/>
        <q-toolbar-title>
          <q-breadcrumbs-el label="Leon's Shaver" to="/"/>
        </q-toolbar-title>
        <div>
          <q-breadcrumbs-el label="Github" href="https://github.com/leoninew/shaver/tree/develop" target="_blank" />
        </div>
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
            </q-list>
          </div>
          <div class="col">
            <router-view/>
          </div>
        </div>
      </div>
    </q-page-container>

    <q-footer elevated></q-footer>
  </q-layout>
</template>

<script setup lang="ts">
  import { useRoute } from "vue-router";

  const route = useRoute();
  const transforms = [
    {
      to: '/csharp',
      title: 'to C#'
    },
    {
      to: '/java',
      title: 'to JAVA'
    },
    {
      to: '/mysql',
      title: 'to MySQL'
    },
    {
      to: '/typescript',
      title: 'to TypeScript'
    },
    {
      to: '/xml',
      title: 'to XML'
    },
    {
      to: '/yaml',
      title: 'to YAML'
    },
  ]
</script>

<style scoped>
  .list-item-active {
    background: linear-gradient(to right, lightgray, lightgray 50%);
  } 
</style>
