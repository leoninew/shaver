<template>
  <a-layout>
    <a-layout-sider style="background: #fff">
      <a-menu mode="inline" theme="light" v-model:selectedKeys="currentMenu">
        <a-menu-item key="/csharp">
          <router-link to="/csharp" class="flex-left-center">
            <SvgIcon path="csharp" />
            <span>&nbsp;to C#</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="/java">
          <router-link to="/java" class="flex-left-center">
            <SvgIcon path="java" />
            <span>&nbsp;to Java</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="/mysql">
          <router-link to="/mysql" class="flex-left-center">
            <SvgIcon path="mysql" />
            <span>&nbsp;to MySQL</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="/python">
          <router-link to="/python" class="flex-left-center">
            <SvgIcon path="python" />
            <span>&nbsp;to Python</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="/typescript">
          <router-link to="/typescript" class="flex-left-center">
            <SvgIcon path="typescript" />
            <span>&nbsp;to TypeScript</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="/xml">
          <router-link to="/xml" class="flex-left-center">
            <SvgIcon path="xml" />
            <span>&nbsp;to XML</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="/yaml">
          <router-link to="/yaml" class="flex-left-center">
            <SvgIcon path="yaml" />
            <span>&nbsp;to YAML</span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout-content style="padding-left: 8px">
      <template v-if="isContainerPage">
        <OnlineTools />
      </template>

      <template v-else>
        <RouterView />
      </template>
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts" setup>
  import OnlineTools from '@/components/OnlineTools.vue';
  import SvgIcon from '@/components/shared/SvgIcon.vue';
  import { onBeforeRouteUpdate, useRoute } from "vue-router";
  import { onMounted, ref } from "vue";

  const route = useRoute();
  const isContainerPage = ref(true);
  const currentMenu = ref(Array<string>());

  onMounted(() => {
    isContainerPage.value = route.path === '/';
    currentMenu.value = [route.path];
  });

  onBeforeRouteUpdate(async (to, from) => {
    isContainerPage.value = to.path === '/';
    currentMenu.value = [to.path];
  })
</script>

<style>
.flex-left-center {
  display: flex;
  justify-content: flex-start;

  align-items: center;
  height: 100%;
  line-height: 100%;
  padding: 8px;
}

.flex-right-center {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  line-height: 100%;
  padding: 8px;
}
</style>