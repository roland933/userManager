<script setup>

import { onMounted,onUnmounted,watch, watchEffect,nextTick,ref } from 'vue';
import { useUserStore } from '../stores/userStore'
import { userTodoStore } from '../stores/userTodoStore'
import {storeToRefs} from 'pinia'
import { Spinner } from '@/components/ui/spinner'

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item'

const store = useUserStore();
const todoStore = userTodoStore();

const itemVariant = (index) => {
  return index % 2 == 0 ? 'muted' : '';
}

watch(() => store.selectedUser,(newUser)  => {
    if (newUser?.id) {
      todoStore.fetchTodos(newUser.id);
    }
  },
  { immediate: true }
)

</script>

<template>
  <div v-if="store.selectedUser">

          <div v-if="todoStore.loading"><Spinner /></div>

          <div v-else-if="todoStore.error">{{ store.error }}</div>

             <div class="flex flex-col gap-3" v-else>
                <Item 
                v-for="(todo,index) in todoStore.todos"
                :variant="itemVariant(index)"
                class="cursor-pointer" 
                :key="todo.id" 
                >
                <ItemContent>
                    <ItemTitle>{{todo.title}}</ItemTitle>
                </ItemContent>
     
              </Item>


  </div>



</div>
    
      

  
</template>