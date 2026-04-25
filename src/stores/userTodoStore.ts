import { defineStore } from "pinia";
import { computed, ref } from "vue";

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

    const toggleTodo = (id:number) => {
         const todo = todos.value.find(t => t.id === id);
         if(todo) {

            todo.completed != todo.compoleted
         }
    }

    const deleteTodo = (id:number) => {
         todos.value = todos.value.filter(t => t.id !== id) 
    }




    return {
        fetchTodos,
        toggleTodo,
        deleteTodo,
        loading,
        error,
        todos
    }



})