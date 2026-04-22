<script setup>

import { onMounted,onUnmounted,watch, watchEffect,nextTick,ref } from 'vue';
import { useUserStore } from '../stores/userStore'
import { userTodoStore } from '../stores/userTodoStore'
import {storeToRefs} from 'pinia'
import { Spinner } from '@/components/ui/spinner'

const store = useUserStore();
const todoStore = userTodoStore();

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

            <div v-else >
                {{todoStore.todos}}

            </div>

</div>
    
      

  
</template>