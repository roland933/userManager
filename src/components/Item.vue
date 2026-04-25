<script setup lang=ts>
import {
  Item,
  ItemContent,
  ItemActions,
} from '@/components/ui/item'


const props = defineProps({
  items: {
    type:Array,
  },
 

   itemClass: Function,
   itemVariant:Function,
})


</script>

<template>
            <Item
                v-for="(item,index) in items"
                :variant="itemVariant? itemVariant(index):''" 
                class="hover:bg-gray-300"
                :class="itemClass ? itemClass(item, index) : ''"
                :key="item.id"
                >
              
           
              <ItemContent class="cursor-pointer" >
                  <slot name="itemTitle" :item="item" /> 
              </ItemContent>
                <ItemActions>
                  <slot name="itemActions" :item="item" />
            </ItemActions>


              </Item>

</template>