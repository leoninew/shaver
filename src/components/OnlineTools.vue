<template>
  <a-space direction="vertical">
    <template v-for="group of groups">
      <h2>{{ group.key }}</h2>
      <template v-for="items of group.items">
        <a-row :gutter="8">
          <template v-for="item of items">
            <a-col :span="6">
              <a-card :title="item.title" :bordered="false">
                <template #extra>
                  <a target="_blank" :href="item.href">
                    <LinkOutlined />
                  </a>
                </template>
                <p>{{ item.describe }}</p>
                <template v-if="item.cover" #cover>
                   <div style="text-align: center">
                     <img :src="item.cover" style="max-width: 100px;" alt="" />
                   </div>
                </template>
              </a-card>
            </a-col>
          </template>
        </a-row>
      </template>
    </template>

  </a-space>
</template>
<script setup lang="ts">
  import { LinkOutlined } from "@ant-design/icons-vue";
  import { onMounted, ref } from "vue";
  import enumerable from "enumerable-es"

  const onlineTools = [
    {
      group: "language",
      title: "JSON Editor Online",
      href: "https://jsoneditoronline.org/",
      describe: "JSON Editor Online is a web-based tool to view, edit, format, repair, compare, query, transform, validate, and share your JSON data.",
    },
    {
      group: "language",
      title: "JSONPath Online Evaluator",
      href: "https://jsonpath.com/",
      describe: "A playground for JSONPath",
    },
    {
      group: "diagrams",
      title: "Mermaid Live Editor",
      href: "https://mermaid.live/edit",
      describe: "Generation of diagrams like flowcharts or sequence diagrams from text in a similar manner as markdown",
    },
    {
      group: "language",
      title: "Transform",
      href: "https://transform.tools/",
      describe: "A polyglot web converter.",
    },
    {
      group: "language",
      title: "Regex101",
      href: "https://regex101.com/",
      describe: "Regular expression tester with syntax highlighting, explanation, cheat sheet for PHP/PCRE, Python, GO, JavaScript, Java, C#/.NET, Rust.",
      cover: "https://camo.githubusercontent.com/668d52234b738c0b196be9bfd071a7845f0d27230dd11c040f8e4a0c268d51c0/68747470733a2f2f72656765783130312e636f6d2f7374617469632f6173736574732f69636f6e2d3135322e706e67"
    },
    {
      group: "language",
      title: "SQLFormat",
      href: "https://sqlformat.org/",
      describe: "Online SQL formatting service",
    },
    {
      group: "docker",
      title: "Composerize",
      href: "https://www.composerize.com/",
      describe: "🏃→🎼 docker run asdlksjfksdf > docker-composerize up",
    },
    {
      group: "language",
      title: "ExplainShell",
      href: "https://explainshell.com/",
      describe: "write down a command-line to see the help text that matches each argument",
    },
    {
      group: "language",
      title: "Online Yaml Tools",
      href: "https://onlineyamltools.com/",
      describe: "World's simplest collection of useful YAML utilities. Convert YAML to XML, JSON, TSV and CSV. Validate, prettify, minify, highlight, edit YAML, and more.",
    },
    {
      group: "diagrams",
      title: "dbdiagram.io",
      href: "https://dbdiagram.io/home/",
      describe: "Draw Entity-Relationship Diagrams, Painlessly 😎",
    },
    {
      group: "diagrams",
      title: "draw.io",
      href: "https://app.diagrams.net/",
      describe: "draw.io is free online diagram software for making flowcharts, process diagrams, org charts, UML, ER and network diagrams.",
      cover: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAgVBMVEXwhwXfbAz////eZgDwgwDssZXgbgveaADwhQDvfgD1sn3eYwDvgADvu6HdYADnl2zznlDsgQf63cf23dL+9/Lzn1f56eLcWwDhdi300sL0rnXwihv0qGjxjifif0H617/2vJDjg0nyyLT3w5zrqIbmkmLkiVTkdQr50rbpoHrymEfhZHaxAAABn0lEQVRIie2X3XKDIBCFQbBgUBITf2rSJmlrbNP3f8CuNkFArcj0qtNzpbN+nnXZZRBlOUeLxfMMbehyDiGaIw+/ztMP+31xqmlBVhTtV0r7g3P56FNgaO9K0sBS6pYt39jgOvYFSeoJMuyS7CjoQo6D2BucJ6fAWXISnCOnwYcZ8NkGjzdwjoxOJldJjN3I+AyPZwUog4tQYOxIduPxUkpZHruGw65klN3zk69grTv+SMZv4IO/C8LgMjHJ9ymOH7QPIzXcPDInMtpCeqqQsgiCncQOJM3B46I8WNPeEgcyai3K/iFZ6QlMk/RsfRTD9lqOkpwPyijCvshK/aLQuFP0AYmVBkhKSL6CdgCJQdfG+WnbCd5eVAnpDUhSARjsOlVrYYJ0ZfZ1oTxFYUZqYoBtkxm63haAXK3ArcAKtEcwuYOhHRH/4F8ErcZSmze7WIHC7Bz+aYb7Pbjd53Q1zJwOmtZhr0abeNlogVrNpbZlCKJkTC0jZCSiDX+Klwj5ksiXRL4k8iWRLzk4IzuSDOX2mdKJJA0a/j44kKzJvgAPSh1sAMD+owAAAABJRU5ErkJggg=="
    },
    {
      group: "diagrams",
      title: "PlantUML Editor",
      href: "https://plantuml-editor.kkeisuke.dev/",
      describe: "PlantUML Editor. New UML. behavioral diagrams; Use Case; Activity β; Activity; Sequence. structural diagrams; Object; Class; ER diagram.",
    },
    {
      group: "docker",
      title: "kube-score",
      href: "https://kube-score.com/",
      describe: "Kubernetes object analysis with recommendations for improved reliability and security.",
      cover: "https://kube-score.com/logo.svg"
    },
    // {
    //   group: "",
    //   title: "",
    //   href: "",
    //   describe: "",
    // },
  ];


  const groups = ref<any>([]);

  onMounted(() => {
    groups.value = enumerable.from(onlineTools)
        .groupBy(x => x.group)
        .select(x => ({ key: x.key(), items: x.chunk(4).toArray() }))
        .toArray();
  });
</script>