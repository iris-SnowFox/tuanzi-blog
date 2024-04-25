import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMessageState = defineStore('message', () => {
    const openProjectMessage = ref("");

    return { openProjectMessage };
})
