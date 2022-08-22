<template>
  <PageHeader />
  <RouterView />
</template>

<script>
import { RouterView } from "vue-router";
import PageHeader from "@/components/PageHeader.vue";
export default {
  components: {
    RouterView,
    PageHeader,
  },
};
</script>

<style></style>
