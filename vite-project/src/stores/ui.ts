import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
    state: () => ({
        loading: false,
        message: null as string | null,
        alertType: "info" as 'info' | 'success' | 'warning' | 'error',
        popupVisible: false,
    }),
    actions: {
        setLoading(value: boolean) {
            this.loading = value
        },
        showMessage(msg: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') {
            this.message = msg;
            this.alertType = type
            this.popupVisible = true
        },
        clearMessage() {
            this.message = null;
            this.popupVisible = false;
        }
    }
})
