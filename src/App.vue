<script setup lang=ts>
import { ref, computed } from 'vue'
import UserList from './components/UserList.vue'
import UserDetails from './components/UserDetails.vue'
import { useUserStore } from './stores/userStore'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const tab = ref<string>('list')
const store = useUserStore()

const currentComponent = computed(() =>
  tab.value === 'list' ? UserList : UserDetails
)
</script>

<template>

  <Tabs :default-value="tab">

    <TabsList>
      <TabsTrigger value="list" 
                   class="cursor-pointer" 
                  @click="tab = 'list'" > 
        Lista  
      </TabsTrigger>

      <TabsTrigger  value="details"
                    @click="tab = 'details'" 
                    :disabled="!store.hasSelectedUser" 
                    class="cursor-pointer">
        Részletek
      </TabsTrigger>
    </TabsList>

    <TabsContent :value="tab" class="bg-white p-5 rounded-lg">
        <component :is="currentComponent" />
    </TabsContent>

  </Tabs>


</template>