<script setup>
import { ref, computed } from 'vue'
import UserList from './components/UserList.vue'
import UserDetails from './components/UserDetails.vue'
import { useUserStore } from './stores/userStore'
import { Button } from '@/components/ui/button'
const tab = ref('list')
const store = useUserStore()

const currentComponent = computed(() =>
  tab.value === 'list' ? UserList : UserDetails
)
</script>

<template>
  <Button @click="tab = 'list'">Lista</Button>
  <Button @click="tab = 'details'" :disabled="!store.hasSelectedUser">
    Részletek
  </Button>

  <component :is="currentComponent" />
</template>