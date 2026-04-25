<script setup lang=ts>

import { onMounted,onUnmounted,watch,ref,computed } from 'vue';
import { useUserStore } from '../stores/userStore';
import { userTodoStore } from '../stores/userTodoStore';
import  Spinner  from '@/components/spinner/Spinner.vue'
import  Dialog  from '@/components/dialog/Dialog.vue';
import  TodoItem  from '@/components/TodoItem.vue';
import  EmptyState  from '@/components/EmptyState.vue';
import  DebouncedSearch  from '@/components/search/DebouncedSearch.vue';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import {

  DialogTrigger,
} from '@/components/ui/dialog'


const store = useUserStore();
const todoStore = userTodoStore();

const search = ref<string>('');

const todoStatus = ref<string>('all');

const filteredTodos = computed(() => {

  let result = todoStore.todos

  if (search.value) {
    result = result.filter(todo =>
      todo.title.toLowerCase().includes(search.value.toLowerCase())
    )
  }

  if (todoStatus.value === "completed") {
    result = result.filter(todo => todo.completed)
  }

  if (todoStatus.value === "unCompleted") {
    result = result.filter(todo => !todo.completed)
  }

  return result
  
})

watch(() => store.selectedUser,(newUser)  => {
    if (newUser?.id) {
      todoStore.fetchTodos(newUser.id);
    }
  },
  { immediate: true }
)

</script>

<template>
<div class="wrapper relative min-h-100">
  <div v-if="store.selectedUser">

  <div class="top-content !mb-5 ">
      <div class="flex gap-3 flex-row  justify-between">
              <div class="flex-1">
                  <DebouncedSearch v-model="search" />
              </div>
                  <div class="flex-1">
                        <Select v-model="todoStatus">
                              <SelectTrigger>
                                  <SelectValue placeholder="Mind" />
                              </SelectTrigger>
                              <SelectContent>
                              <SelectItem value="all">
                                Mind
                              </SelectItem>
                              <SelectItem value="completed">
                                  Teljesített
                              </SelectItem>
                              <SelectItem value="unCompleted">
                                  Nem teljesített
                              </SelectItem>

                              </SelectContent>
                          </Select>
                    </div>

                   <div>

                   
                        
                        <Dialog />
                      
                  </div>

                </div>
            </div>
          
            <Spinner v-if="todoStore.loading"/>
          
             <div v-else-if="todoStore.error">{{ store.error }}</div>

             <div class="flex flex-col gap-3" v-else>

              <TodoItem :items="filteredTodos" />

                     
              </div>


          <empty-state :show="filteredTodos.length === 0 && !todoStore.loading" />
      </div>
    
      </div>
</template>