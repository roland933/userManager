<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { userTodoStore } from '@/stores/userTodoStore';

import {ref} from 'vue';

const todoStore = userTodoStore();

const title = ref('');

const open = ref(false);

const handleAddNew = () => {
    

    if (!title.value.trim()) return

    const newTodo = {
            id: Date.now(),
            title:title.value,
            completed: false
    }

    open.value = false;
    title.value = ""
    todoStore.todos.push(newTodo);

}


</script>

<template>
  <Dialog v-model:open="open">
    <form >
      <DialogTrigger as-child>
        <Button cursor-pointer>
          Új felvétel
        </Button>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Feladat felvétel</DialogTitle>
          
        </DialogHeader>
        <div class="grid gap-4">
          <div class="grid gap-3">
            <Label for="name-1">Név</Label>
            <Input id="name-1" name="name"  v-model="title" />
          </div>
          
        </div>
        <DialogFooter>
          <DialogClose as-child>
            <Button variant="outline">
              Mégse
            </Button>
          </DialogClose>
            <Button @click="handleAddNew">
            Mentés
            </Button>
        </DialogFooter>
      </DialogContent>
    </form>
  </Dialog>
</template>
