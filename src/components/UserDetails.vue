<script setup>
import { useUserStore } from '../stores/userStore'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'

const store = useUserStore();


</script>

<template>
  <div v-if="store.selectedUser">

  <div class="flex">
    <div class="w-64">
        <Avatar class="w-50 h-50 rounded-md">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    </div>

    <div class="w-96">

      <h2 class="text-2xl !mb-3 border-b-2 pb-2 !font-bold">{{ store.selectedUser.name }}</h2>
  
      <p>{{ store.selectedUser.email }}</p>
      <p>{{ store.selectedUser.phone }}</p>
    </div>

</div>

    
  </div>

  <div v-else>
    Válassz egy felhasználót
  </div>
</template>