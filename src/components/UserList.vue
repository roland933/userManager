<script setup lang=ts>
import { onMounted, ref, computed } from 'vue'
import { useUserStore } from '../stores/userStore'
import { Spinner } from '@/components/ui/spinner'
import  EmptyState  from '@/components/EmptyState.vue'


import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText } from '@/components/ui/input-group'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/ui/item'

const store = useUserStore();
const search = ref('');

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
          <InputGroup class="bg-white !mb-8">
            <InputGroupInput placeholder="Keresés..."  v-model="search"  class="mb-5"/>
            
            <InputGroupAddon align="inline-end">
             {{searchResult}}
            </InputGroupAddon>
          </InputGroup>
        
  <div v-if="store.loading">
        <Spinner />
  </div>

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
     

</template>