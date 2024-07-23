<template>
    <div v-if="flavor">
      <h2>{{ flavor.name }}</h2>
      <p>{{ flavor.description }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const flavor = ref(null);
  
  const fetchFlavor = async () => {
    const id = route.params.id;
    const response = await fetch(`/api/coffee-flavors/${id}`);
    flavor.value = await response.json();
  };
  
  onMounted(() => {
    fetchFlavor();
  });
  </script>