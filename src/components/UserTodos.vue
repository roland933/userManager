<script setup lang=ts>

import { onMounted,onUnmounted,watch,ref,computed } from 'vue';
import { useUserStore } from '../stores/userStore';
import { userTodoStore } from '../stores/userTodoStore';
import  Spinner  from '@/components/spinner/Spinner.vue'
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/ui/item'

import  EmptyState  from '@/components/EmptyState.vue';
import  DebouncedSearch  from '@/components/search/DebouncedSearch.vue';

const store = useUserStore();
const todoStore = userTodoStore();

const itemVariant = (index:number) => {
  return index % 2 == 0 ? 'muted' : '';
}

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
      <div class="flex flex-row gap-5">
          <div class="basis-2/3">
                    <DebouncedSearch v-model="search" class="!mb-5"/>
          </div>
              <div class="basis-1/3">
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
          </div>


            <Spinner v-if="todoStore.loading"/>
          
          <div v-else-if="todoStore.error">{{ store.error }}</div>

             <div class="flex flex-col gap-3" v-else>
                <Item 
                v-for="(todo,index) in filteredTodos"
                :variant="itemVariant(index)"
                class="cursor-pointer" 
                :key="todo.id" 
                >
                <ItemContent>
                    <ItemTitle  class="!font-semibold">
                        <Checkbox

                            class="w-5 h-5 border-1 border-gray-600"
                            disabled
                            v-model="todo.completed"
                            :id="`${todo.id}`"
                            />
                         
                        {{todo.title}}
                        </ItemTitle>
                </ItemContent>
              </Item>
        </div>
          <empty-state :show="filteredTodos.length === 0 && !todoStore.loading" />
</div>
    
      </div>
</template>