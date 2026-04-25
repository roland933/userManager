<script setup lang="ts">
import { Spinner } from '@/components/ui/spinner'
import type { HTMLAttributes } from 'vue'
import { LoaderIcon } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

</script>

<template>
    <div 
      
      class="absolute top-0 h-100 w-full bg-opacity-70 backdrop-blur-sm flex justify-center items-center">
         <LoaderIcon
            role="status"
            aria-label="Loading"
            :class="cn('size-4 animate-spin', props.class)"
            />
    </div>

</template>



