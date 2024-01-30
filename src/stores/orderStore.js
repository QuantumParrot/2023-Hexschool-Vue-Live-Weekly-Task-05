import axios from 'axios';

import { defineStore, mapActions } from 'pinia';

import messageStore from './messageStore';
import loaderStore from './loaderStore';

import cartStore from './cartStore';

const { VITE_APP_SITE, VITE_APP_PATH } = import.meta.env;

export default defineStore('orderStore', {

    state: () => ({

        isDisplay: false,

    }),

    actions: {
        
        ...mapActions(loaderStore, ['createLoader', 'removeLoader']),

        showForm() { this.isDisplay = true },
        
        submit(userData, { resetForm }) {

            this.createLoader('submitOrder');

            const { getCartData } = cartStore();

            const { toastMessage } = messageStore();

            const data = {
                "user": {
                    "name": userData.name,
                    "tel": userData.tel,
                    "email": userData.email,
                    "address": userData.address
                },
                "message": userData.message || '無'
            };

            axios.post(`${VITE_APP_SITE}/api/${VITE_APP_PATH}/order`, { data })
            .then((res) => {
                // console.log(res);
                this.removeLoader('submitOrder');
                toastMessage('success', '感謝您的訂購！');
                resetForm();
                this.isDisplay = false,
                getCartData();
            })
            .catch((error) => {
                console.log(error);
                this.removeLoader('submitOrder');
            })

        }

    },

});