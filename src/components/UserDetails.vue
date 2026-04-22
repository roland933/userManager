<script setup>
import { useUserStore } from '../stores/userStore'

const store = useUserStore()
</script>

<template>
  <div v-if="store.selectedUser">
    <h2>{{ store.selectedUser.name }}</h2>
    <p>{{ store.selectedUser.email }}</p>
    <p>{{ store.selectedUser.phone }}</p>
  </div>

  <div v-else>
    Válassz egy felhasználót
  </div>
</template>