<script setup lang=ts>
import { onMounted, ref, computed } from 'vue'
import { useUserStore } from '../stores/userStore'
import  EmptyState  from '@/components/EmptyState.vue'
import  DebouncedSearch  from '@/components/search/DebouncedSearch.vue'
import  Spinner  from '@/components/spinner/Spinner.vue'

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/ui/item'

const store = useUserStore();

const search = ref<string>('');

onMounted(() => {
  store.fetchUsers();
})

const filteredUsers = computed(() => {
  return store.users.filter(user =>
    user.name.toLowerCase().includes(search.value.toLowerCase())
  )
})

const searchResult = computed<number>(() => {
  if(search.value) {
    return filteredUsers.value.length;
  }
})

const itemVariant = (index:number) => {
  return index % 2 == 0 ? 'muted' : '';
}



</script>

<template>
    <div class="wrapper relative min-h-100">

        <DebouncedSearch v-model="search" class="!mb-5" placeholder="Felhasználó keresése"/>

        <Spinner v-if="store.loading" />

        <div v-else-if="store.error">{{ store.error }}</div>

   <div class="flex flex-col gap-3" v-else>
    <Item v-for="(user,index) in filteredUsers"
          :variant="itemVariant(index)"
          class="cursor-pointer" 
          :class="{ 'bg-gray-200': store.selectedUser?.id === user.id }" 
          :key="user.id" 
          @click="store.setSelectedUser(user)">
      <ItemContent>
        <ItemTitle>{{user.name}}</ItemTitle>
        <ItemDescription>
          {{user.email}}
        </ItemDescription>
      </ItemContent>
     
    </Item>
  </div>

  <empty-state :show="filteredUsers.length === 0 && !store.loading" />
    
    </div>

</template>