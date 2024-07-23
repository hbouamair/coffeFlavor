<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="name" placeholder="Name" required />
    <textarea v-model="description" placeholder="Description"></textarea>
    <button type="submit">Save</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';

const name = ref('');
const description = ref('');

const handleSubmit = async () => {
  const response = await fetch('/api/coffee-flavors', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name.value,
      description: description.value,
    }),
  });
  const data = await response.json();
  console.log(data);
};
</script>