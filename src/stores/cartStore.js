import axios from 'axios';

import { defineStore, mapState, mapActions } from 'pinia';

import messageStore from './messageStore';
import loaderStore from './loaderStore';

const { VITE_APP_SITE, VITE_APP_PATH } = import.meta.env;

export default defineStore('cartStore', {

  state: () => ({

    cartList: { 
      
      carts: [],
    
    },

  }),

  getters: {

    ...mapState(loaderStore, ['isLoading']),

  },

  actions: {

    ...mapActions(loaderStore, ['createLoader', 'removeLoader']),

    getCartData() {

      this.createLoader('getCartData');

      const { errorMessage } = messageStore();

      axios.get(`${VITE_APP_SITE}/api/${VITE_APP_PATH}/cart`)
      .then((res) => {

        // console.log(res);

        this.cartList = res.data.data;
        this.removeLoader('getCartData');
      
      })
      .catch((error) => { 
      
        errorMessage(error);
        this.removeLoader('getCartData');

      })

    },

    addToCart(product_id, qty = 1) {

      const { toastMessage, errorMessage } = messageStore();

      this.createLoader('addToCart');

      const isExist = this.cartList.carts.find((item) => item.product.id === product_id);

      // console.log(isExist);

      if (!isExist) {

        axios.post(`${VITE_APP_SITE}/api/${VITE_APP_PATH}/cart`, {
          data: { 
            product_id,
            qty
          }
        })
        .then((res) => {

          // console.log(res);
          const { data, message } = res.data;

          this.removeLoader('addToCart');
          this.getCartData();
          toastMessage('success', message);

        })
        .catch((error) => { 
          
          errorMessage(error);
          this.removeLoader('addToCart');
        
        })

      } else {

        const qty = isExist.qty += 1;
        this.changeItemQty(isExist.id, qty);

      }

    },

    changeItemQty(product_id, qty) {

      this.createLoader('changeItemQty');
      
      const { toastMessage, errorMessage } = messageStore();

      qty = qty * 1;

      axios.put(`${VITE_APP_SITE}/api/${VITE_APP_PATH}/cart/${product_id}`, {
        data: {
          product_id,
          qty
        }
      })
      .then((res) => {

        // console.log(res);
        const { message } = res.data;

        this.removeLoader('changeItemQty');
        this.getCartData();
        toastMessage('success', message);
      
      })
      .catch((error) => {

        errorMessage(error);
        this.removeLoader('changeItemQty');
      
      })

    },

    deleteCartItem(id) {

      this.createLoader('deleteCartItem');

      const { toastMessage, errorMessage } = messageStore();

      axios.delete(`${VITE_APP_SITE}/api/${VITE_APP_PATH}/cart/${id}`)
      .then((res) => {

        // console.log(res);
        const { message } = res.data;

        this.removeLoader('deleteCartItem');
        this.getCartData();
        toastMessage('success', message);

      })
      .catch((error) => { 
        
        errorMessage(error);
        this.removeLoader('deleteCartItem');
      
      })
    
    },

    deleteAll() {

      this.createLoader('deletaAll');

      const { toastMessage, errorMessage } = messageStore();

      axios.delete(`${VITE_APP_SITE}/api/${VITE_APP_PATH}/carts`)
      .then((res) => {

        this.removeLoader('deletaAll');
        this.getCartData();
        toastMessage('success', '已清空購物車');

      })
      .catch((error) => {

        errorMessage(error);
        this.removeLoader('deletaAll');

      })

    },

  },

});
