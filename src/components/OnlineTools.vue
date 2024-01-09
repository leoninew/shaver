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
    },
    {
      group: "diagrams",
      title: "PlantUML Editor",
      href: "https://plantuml-editor.kkeisuke.dev/",
      describe: "PlantUML Editor. New UML. behavioral diagrams; Use Case; Activity β; Activity; Sequence. structural diagrams; Object; Class; ER diagram.",
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