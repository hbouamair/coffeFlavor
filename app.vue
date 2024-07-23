<template>
  <div>
    <HeaderComponent />
    <main>
      <!-- Use <NuxtPage /> to render the routed content -->
      <NuxtPage />
    </main>
    <FooterComponent />
  </div>
</template>

<script setup>
import HeaderComponent from '~/components/HeaderComponent.vue';
import FooterComponent from '~/components/FooterComponent.vue';
</script>

<style>
/* Add global styles if needed */
</style>