<script setup lang=ts>
import { onMounted, ref, computed } from 'vue'
import { useUserStore } from '../stores/userStore'
import  EmptyState  from '@/components/EmptyState.vue'
import  DebouncedSearch  from '@/components/search/DebouncedSearch.vue'
import  Spinner  from '@/components/spinner/Spinner.vue'
import  UserItem  from '@/components/Item.vue';
import { cn } from "@/lib/utils"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/ui/item'
import { User } from 'lucide-vue-next'

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


const handleSelectedUser = (user) => {
    store.setSelectedUser(user);
}

const isSelected = (user) => {
  return store.selectedUser?.id === user.id;
}

const searchResult = computed<number>(() => {
  if(search.value) {
    return filteredUsers.value.length;
  }
})


</script>

<template>
    <div class="wrapper relative min-h-100">

        <DebouncedSearch v-model="search" class="!mb-5" placeholder="Felhasználó keresése"/>

        <Spinner v-if="store.loading" />

        <div v-else-if="store.error">{{ store.error }}</div>

   <div class="flex flex-col gap-3" v-else>

        <UserItem :items="filteredUsers"
              
                  @select="handleSelectedUser",
                   >
                 

             <template v-slot:itemTitle="{item}">
                      <div :class="{ 'bg-gray-200': isSelected(item) }" >
                          <ItemTitle>
                            {{item.name}}
                          </ItemTitle>
                  
                          <ItemDescription>
                            {{item.email}}
                          </ItemDescription>
                      </div>
                         
                      
                </template>
                
          </UserItem> 

  </div>

  <empty-state :show="filteredUsers.length === 0 && !store.loading" />
    
    </div>

</template>