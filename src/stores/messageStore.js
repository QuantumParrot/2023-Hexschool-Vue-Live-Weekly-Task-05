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

        errorMessage(icon, text) {

        },

    },

})