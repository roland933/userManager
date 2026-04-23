<script setup lang=ts>

defineProps<{
  show?: boolean

}>()



</script>

<template>

    <div v-if="show" class="text-center rounded-md py-2"> 

      <slot name="text">Nincs találat a keresésre !</slot> 
      
      </div>

</template>