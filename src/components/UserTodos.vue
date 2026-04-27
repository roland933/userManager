<script setup lang=ts>

import { onMounted,onUnmounted,watch,ref,computed } from 'vue';
import { useUserStore } from '../stores/userStore';
import { userTodoStore } from '../stores/userTodoStore';
import  Spinner  from '@/components/spinner/Spinner.vue'
import  Dialog  from '@/components/dialog/Dialog.vue';
import  TodoItem  from '@/components/TodoItem.vue';
import  EmptyState  from '@/components/EmptyState.vue';
import  DebouncedSearch  from '@/components/search/DebouncedSearch.vue';
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Badge from './ui/badge/Badge.vue';



const userStore = useUserStore();
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

watch(() => userStore.selectedUser,(newUser)  => {
    if (newUser?.id) {
      todoStore.fetchTodos(newUser.id);
    }
  },
  { immediate: true }
)

</script>

<template>
<div class="wrapper relative min-h-100">
  <div v-if="userStore.selectedUser">
    <div class="flex gap-3 flex-row !mb-6 text-[14px] border-b-2 pb-4">
        <div class="flex-1">
              Felhasználó: <span class="!font-bold">{{userStore.getUserName }} </span>
        </div>
        <div >
              Összes feladat: <Badge   class="h-5 min-w-5 rounded-full px-1 tabular-nums">{{todoStore.getAllTodoNumber  }}</Badge>
        </div>
        <div>
            Teljesített feladatok száma:  <Badge class="h-5 min-w-5 rounded-full px-1 tabular-nums bg-green-600">{{todoStore.getCompletedTodoNumber  }}</Badge>
        </div>
        <div>
            Nem Teljesített feladatok száma: <Badge  class="h-5 min-w-5 rounded-full px-1 tabular-nums bg-red-500">{{todoStore.getUnCompletedTodoNumber  }}</Badge>
        </div>


    </div>

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

                <div class="flex flex-col gap-3" v-else v-if="filteredTodos.length !== 0">
                       <ScrollArea class="h-96 rounded-md border">
                          <TodoItem :items="filteredTodos" />
                        </ScrollArea>

                  </div>


          <empty-state :show="filteredTodos.length === 0 && !todoStore.loading" />
      </div>
    
      </div>
</template>