import axios from 'axios';

import { defineStore, mapActions } from 'pinia';

import messageStore from './messageStore';
import loaderStore from './loaderStore';

const { VITE_APP_SITE, VITE_APP_PATH } = import.meta.env;

export default defineStore('productStore', {

  state: () => ({

    products: [],

    pagination: {},

  }),

  actions: {

    ...mapActions(loaderStore, ['createLoader', 'removeLoader']),

    getProductData(page = 1) {

      this.createLoader('getProduct');

      const { errorMessage } = messageStore();

      // 練習看看這個 API ( 之前都是用取得全部商品那一個 )

      axios.get(`${VITE_APP_SITE}/api/${VITE_APP_PATH}/products?page=${page}`)
      .then((res) => {

        // console.log(res.data);

        this.productsData = res.data.products;
        this.pagination = res.data.pagination;
      
      })
      .catch((error) => { 
        
        errorMessage(error);
      
      })
      .finally(() => { this.removeLoader('getProduct'); })
    
    },

  },

});
