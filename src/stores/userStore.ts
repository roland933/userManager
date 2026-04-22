import { defineStore } from "pinia";
import { ref,computed } from "vue";

export const useUserStore = defineStore('user',() => {

    const users = ref<any[]>([]);
    const selectedUser = ref<any | null>(null);
    const loading = ref<boolean>(false);
    const error = ref<string | null>(null);


    const fetchUsers = async ()  => {
        loading.value = true;
        error.value = null;

        try {
                const res = await fetch('https://jsonplaceholder.typicode.com/users')
                 users.value = await res.json()
        }catch(e) {
                error.value = "Hiba történt a felhasználók lekérése közben!";
        }finally {
            loading.value = false;
        }
    }

    const  setSelectedUser = (user:any) => {
        selectedUser.value = user
    }

    const hasSelectedUser = computed(() => !!selectedUser.value)


    return {
        users,
        loading,
        fetchUsers,
        setSelectedUser,
        selectedUser,
        hasSelectedUser,
        error
    }

})