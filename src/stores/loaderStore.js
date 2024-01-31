import { defineStore } from 'pinia';

export default defineStore('loaderStore', {

    state: () => ({

        // 練習看看網路上找到的解法：Handing Loading Flags in Pinia Stores - Brenton Klik
        
        // https://medium.com/@bklik/handing-loading-flags-in-pinia-stores-bfdcee5b9fb

        loadingQueue: []
    
    }),

    actions: {

        createLoader(task) { this.loadingQueue.push(task) },

        removeLoader(task) { this.loadingQueue.splice(this.loadingQueue.indexOf(task), 1) }

    },

    getters: {

        isLoading: ({ loadingQueue }) => !!loadingQueue.length,

    }

});
