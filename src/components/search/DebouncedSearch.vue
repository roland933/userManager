<script setup>
import { ref, watch } from 'vue'

import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText } from '@/components/ui/input-group'
const modelValue = defineModel();

const localValue = ref(modelValue.value);
let timeout = null;

const props = defineProps({
  delay: {
    type: Number,
    default: 500
  },
  placeholder: {
    type:String,
    default:'Keresés'
  }
})

watch(localValue, (val) => {
  clearTimeout(timeout)

  timeout = setTimeout(() => {
    modelValue.value = val
  }, props.delay)
})
</script>

<template>
   <InputGroup class="bg-white">
            <InputGroupInput :placeholder="placeholder"  v-model="localValue"/>
    </InputGroup>
</template>