<template>
    <div>
      <h3>Available Coffee Flavors</h3>
      <ul>
        <li v-for="flavor in flavors" :key="flavor.id">
          {{ flavor.name }}: {{ flavor.description }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import client from '~/prisma/client'; // Adjust if necessary
  
  const flavors = ref([]);
  
  onMounted(async () => {
  const response = await fetch('/api/coffee-flavors'); // Call your API route
  flavors.value = await response.json();
});
  </script>
  
  <style scoped>
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    padding: 0.5rem 0;
  }
  </style>