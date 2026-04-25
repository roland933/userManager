<script setup lang="ts">
import { userTodoStore } from '../stores/userTodoStore';
import  TodoItem  from '@/components/Item.vue';
import { CircleX } from 'lucide-vue-next'

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import {
  ItemTitle,
} from '@/components/ui/item'

const todoStore = userTodoStore();

const props = defineProps({
  items: {
    type:Array,
  },
})


</script>
  
  
  <template>

  <TodoItem :items="items" >

                          <template v-slot:itemTitle="{item}">
                                <ItemTitle   >
                                  <Checkbox
                                    @update:model-value="todoStore.toggleTodo(item.id)"
                                      class="w-5 h-5 border-1 border-gray-600"
                                      v-model="item.completed"
                                      :id="`${item.id}`"
                                      />
                                  
                                  <Label :for="`${item.id}`" class="cursor-pointer" :class="[{'line-through text-gray-400':item.completed}]"> {{item.title}} </Label>

                                  </ItemTitle>

                          </template>

                          <template v-slot:itemActions={item}>
                                      <Button  :class="{'cursor-pointer':!item.completed}" 
                                                variant="outline" 
                                                size="icon" 
                                                :disabled="item.completed" 
                                                @click="todoStore.deleteTodo(item.id)">
                                      <CircleX />
                                    </Button>
                          </template>
                        </TodoItem>
    
 </template>