import axios from 'axios';

import { defineStore, mapActions } from 'pinia';

import messageStore from './messageStore';
import loaderStore from './loaderStore';

const { VITE_APP_SITE, VITE_APP_PATH } = import.meta.env;

export default defineStore('productStore', {

  state: () => ({

    products: [],

  }),

  actions: {

    ...mapActions(loaderStore, ['createLoader', 'removeLoader']),

    getProductData() {

      this.createLoader('getProduct');

      const { errorMessage } = messageStore();

      axios.get(`${VITE_APP_SITE}/api/${VITE_APP_PATH}/products`)
      .then((res) => {

        this.products = res.data.products;
      
      })
      .catch((error) => { 
        
        errorMessage(error);
      
      })
      .finally(() => { this.removeLoader('getProduct'); })
    
    },

  },

});
