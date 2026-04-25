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
  variant:{
    type:String,
    default:'muted'
  }
})

const itemVariant = (index:number) => {
  return index % 2 == 0 ? props.variant : '';
}

const emit = defineEmits(['select']);


</script>

<template>
    
            <Item
                v-for="(item,index) in items"
                :variant="itemVariant(index)" 
                @click="emit('select',item)"
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