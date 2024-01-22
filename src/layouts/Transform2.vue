<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" />
        <q-toolbar-title>
          <q-breadcrumbs-el label="Leon's Shaver" to="/" />
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
              <q-expansion-item v-for="item in transforms"
                                :to="item.to" active-class="list-item-active" :label="item.title" :content-inset-level="0.5"  default-opened>
                <q-list dense separator v-if="item.children">
                  <q-expansion-item v-for="item2 in item.children"
                                    :to="item2.to" active-class="list-item-active" :label="item2.title"   default-opened>
                  </q-expansion-item>
                </q-list>
              </q-expansion-item>
            </q-list>
          </div>

          <div class="col">
            <template v-if="isContainerPage" v-for="group in onlineToolsGroups">
              <div class="text-h5 text-uppercase">{{ group.key }}</div>
              <div class="q-pa-md row items-start q-gutter-md">
                <q-card v-for="item in group.items" style="max-width: 350px">
                  <q-card-section>
                    <div class="text-h6 text-primary">
                      <q-breadcrumbs-el :label="item.title" target="_blank" :href="item.href" />
                    </div>
                    <img v-if="item.cover" alt="" :src="item.cover" style="max-width: 100px;">
                    <div class="text-subtitle2">{{ item.describe }}</div>
                  </q-card-section>
                </q-card>
              </div>
            </template>

            <template v-else>
              <router-view />
            </template>
          </div>
        </div>
      </div>
    </q-page-container>
    <q-footer elevated></q-footer>
  </q-layout>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { onBeforeRouteUpdate, useRoute } from 'vue-router'
  import enumerable from 'enumerable-es'

  const route = useRoute()
  const isContainerPage = ref(true)
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
      to: '#',
      title: 'to TypeScript',
      children: [
        {
          to: '/typescript?kind=type',
          title: 'type declaration',
        },
        {
          to: '/typescript?kind=rest',
          title: 'axios rest api declaration',
        }
      ]
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

  const onlineTools = [
    {
      group: 'language',
      title: 'JSON Editor Online',
      href: 'https://jsoneditoronline.org/',
      describe: 'JSON Editor Online is a web-based tool to view, edit, format, repair, compare, query, transform, validate, and share your JSON data.',
    },
    {
      group: 'language',
      title: 'JSONPath Online Evaluator',
      href: 'https://jsonpath.com/',
      describe: 'A playground for JSONPath',
    },
    {
      group: 'diagrams',
      title: 'Mermaid Live Editor',
      href: 'https://mermaid.live/edit',
      describe: 'Generation of diagrams like flowcharts or sequence diagrams from text in a similar manner as markdown',
    },
    {
      group: 'language',
      title: 'Transform',
      href: 'https://transform.tools/',
      describe: 'A polyglot web converter.',
    },
    {
      group: 'language',
      title: 'Regex101',
      href: 'https://regex101.com/',
      describe: 'Regular expression tester with syntax highlighting, explanation, cheat sheet for PHP/PCRE, Python, GO, JavaScript, Java, C#/.NET, Rust.',
      cover: 'https://camo.githubusercontent.com/668d52234b738c0b196be9bfd071a7845f0d27230dd11c040f8e4a0c268d51c0/68747470733a2f2f72656765783130312e636f6d2f7374617469632f6173736574732f69636f6e2d3135322e706e67'
    },
    {
      group: 'language',
      title: 'SQLFormat',
      href: 'https://sqlformat.org/',
      describe: 'Online SQL formatting service',
    },
    {
      group: 'docker',
      title: 'Composerize',
      href: 'https://www.composerize.com/',
      describe: '🏃→🎼 docker run asdlksjfksdf > docker-composerize up',
    },
    {
      group: 'language',
      title: 'ExplainShell',
      href: 'https://explainshell.com/',
      describe: 'write down a command-line to see the help text that matches each argument',
    },
    {
      group: 'language',
      title: 'Online Yaml Tools',
      href: 'https://onlineyamltools.com/',
      describe: 'World\'s simplest collection of useful YAML utilities. Convert YAML to XML, JSON, TSV and CSV. Validate, prettify, minify, highlight, edit YAML, and more.',
    },
    {
      group: 'diagrams',
      title: 'dbdiagram.io',
      href: 'https://dbdiagram.io/home/',
      describe: 'Draw Entity-Relationship Diagrams, Painlessly 😎',
    },
    {
      group: 'diagrams',
      title: 'draw.io',
      href: 'https://app.diagrams.net/',
      describe: 'draw.io is free online diagram software for making flowcharts, process diagrams, org charts, UML, ER and network diagrams.',
      cover: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAgVBMVEXwhwXfbAz////eZgDwgwDssZXgbgveaADwhQDvfgD1sn3eYwDvgADvu6HdYADnl2zznlDsgQf63cf23dL+9/Lzn1f56eLcWwDhdi300sL0rnXwihv0qGjxjifif0H617/2vJDjg0nyyLT3w5zrqIbmkmLkiVTkdQr50rbpoHrymEfhZHaxAAABn0lEQVRIie2X3XKDIBCFQbBgUBITf2rSJmlrbNP3f8CuNkFArcj0qtNzpbN+nnXZZRBlOUeLxfMMbehyDiGaIw+/ztMP+31xqmlBVhTtV0r7g3P56FNgaO9K0sBS6pYt39jgOvYFSeoJMuyS7CjoQo6D2BucJ6fAWXISnCOnwYcZ8NkGjzdwjoxOJldJjN3I+AyPZwUog4tQYOxIduPxUkpZHruGw65klN3zk69grTv+SMZv4IO/C8LgMjHJ9ymOH7QPIzXcPDInMtpCeqqQsgiCncQOJM3B46I8WNPeEgcyai3K/iFZ6QlMk/RsfRTD9lqOkpwPyijCvshK/aLQuFP0AYmVBkhKSL6CdgCJQdfG+WnbCd5eVAnpDUhSARjsOlVrYYJ0ZfZ1oTxFYUZqYoBtkxm63haAXK3ArcAKtEcwuYOhHRH/4F8ErcZSmze7WIHC7Bz+aYb7Pbjd53Q1zJwOmtZhr0abeNlogVrNpbZlCKJkTC0jZCSiDX+Klwj5ksiXRL4k8iWRLzk4IzuSDOX2mdKJJA0a/j44kKzJvgAPSh1sAMD+owAAAABJRU5ErkJggg=='
    },
    {
      group: 'diagrams',
      title: 'PlantUML Editor',
      href: 'https://plantuml-editor.kkeisuke.dev/',
      describe: 'PlantUML Editor. New UML. behavioral diagrams; Use Case; Activity β; Activity; Sequence. structural diagrams; Object; Class; ER diagram.',
    },
    {
      group: 'docker',
      title: 'kube-score',
      href: 'https://kube-score.com/',
      describe: 'Kubernetes object analysis with recommendations for improved reliability and security.',
      cover: 'https://kube-score.com/logo.svg'
    },
    // {
    //   group: "",
    //   title: "",
    //   href: "",
    //   describe: "",
    // },
  ]

  const onlineToolsGroups = ref<any>([])

  onMounted(() => {
    isContainerPage.value = route.path === '/'
    onlineToolsGroups.value = enumerable.from(onlineTools)
      .groupBy(x => x.group)
      .select(x => ({
        key: x.key(),
        items: x.toArray()
      }))
      .toArray()
  })

  onBeforeRouteUpdate((to) => {
    isContainerPage.value = to.path === '/'
  })
</script>

<style scoped>
.list-item-active {
  background: linear-gradient(to right, lightgray, lightgray 50%);
}
</style>
