import { defineStore } from 'pinia';

export default defineStore('loaderStore', {

    state: () => ({

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
