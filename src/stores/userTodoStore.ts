import { defineStore } from "pinia";
import { ref } from "vue";

export const userTodoStore = defineStore('userTodo',() => {


    const todos = ref<any[]>([]);
    const loading = ref<boolean>(false);
    const error = ref<string | null>(null);
  

    const fetchTodos =  async (id:number) => {
    
         loading.value = true;
         error.value = null;

         try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/todos/?userId=${id}`)
            todos.value =  await res.json();

         }catch(e) {
            error.value="Hiba történt feladat lekérés közben!"
         }finally {
            loading.value=false;
         }

    }



    return {
        fetchTodos,
        loading,
        error,
        todos
    }



})