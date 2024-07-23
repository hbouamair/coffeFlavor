<template>
    <div>
      <h2>All Coffee Flavors</h2>
      <CoffeeFlavorForm />
      <ul>
        <li v-for="flavor in flavors" :key="flavor.id">
          <span>{{ flavor.name }}: {{ flavor.description }}</span>
          <button @click="deleteFlavor(flavor.id)">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const flavors = ref([]);
  
  onMounted(async () => {
    const response = await fetch('/api/coffee-flavors');
    flavors.value = await response.json();
  });
  
  const deleteFlavor = async (id) => {
    try {
      const response = await fetch(`/api/coffee-flavors/id/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        flavors.value = flavors.value.filter(flavor => flavor.id !== id);
        console.log('Flavor deleted successfully!');
      } else {
        console.error('Failed to delete flavor');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>