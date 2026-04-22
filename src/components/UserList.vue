<script setup>
import { onMounted, ref, computed } from 'vue'
import { useUserStore } from '../stores/userStore'
import { Spinner } from '@/components/ui/spinner'



const store = useUserStore()
const search = ref('')

onMounted(() => {
  store.fetchUsers()
})

const filteredUsers = computed(() => {
  return store.users.filter(user =>
    user.name.toLowerCase().includes(search.value.toLowerCase())
  )
})
</script>

<template>
   <div> 
        <input v-model="search" placeholder="Keresés..." />
   </div>
  <div v-if="store.loading">
        <Spinner />

  </div>
  <div v-else-if="store.error">{{ store.error }}</div>

  <ul v-else>
    <li
      v-for="user in filteredUsers"
      :key="user.id"
      @click="store.setSelectedUser(user)"
    >
      {{ user.name }} - {{ user.email }}
    </li>
  </ul>
</template>