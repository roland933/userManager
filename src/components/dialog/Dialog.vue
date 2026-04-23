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

import {ref} from 'vue';


const open = ref(false);


</script>

<template>
  <Dialog v-model:open="open">
    <form>
      <DialogTrigger as-child>
        <Button variant="outline">
          Új felvétel
        </Button>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Feladat felvétel</DialogTitle>
          <DialogDescription>
           
          </DialogDescription>
        </DialogHeader>
        <div class="grid gap-4">
          <div class="grid gap-3">
            <Label for="name-1">Név</Label>
            <Input id="name-1" name="name"  />
          </div>
          
        </div>
        <DialogFooter>
          <DialogClose as-child>
            <Button variant="outline">
              Mégse
            </Button>
          </DialogClose>
            <Button  @click="() => open = false">
            Mentés
            </Button>
        </DialogFooter>
      </DialogContent>
    </form>
  </Dialog>
</template>
