import Swal from 'sweetalert2';

import { defineStore } from 'pinia';

export default defineStore('messageStore', {

    actions: {

        toastMessage(icon, text) {

            Swal.fire({
                icon,
                text,
                toast: true,
                timer: 1500,
                position: 'center',
                showConfirmButton: false,
            })

        },

        errorMessage(error, icon) {

            console.log(error);

            if (error.code === 'ERR_NETWORK') { alert('網路連線異常，請重新確認連線狀態後再嘗試') }

            else if (error.response) {

            this.toastMessage(icon || 'warning', error.response.data.message);
            
            }

        },

    },

})