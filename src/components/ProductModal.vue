<script>

import Modal from 'bootstrap/js/dist/modal';

export default {

    props: ['product'],

    data() {
        
        return { modal: '' }

    },

    methods: {

        showModal() { this.modal.show(); },

        hideModal() { this.modal.hide(); }

    },

    mounted() {

        this.modal = new Modal(this.$refs.modal);

    }

}

</script>

<template>

<div class="modal modal-lg fade" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header py-3">
                <h3 class="modal-title fs-5" id="productModalLabel">
                    <span class="me-3">{{ product.title }}</span>
                    <span class="badge bg-light text-dark" v-for="tag in product.tags" :key="tag">＃{{ tag }}</span>
                </h3>
                <button type="button" class="btn-close" aria-label="Close" @click="hideModal"></button>
            </div>
            <div class="modal-body p-4">
                <div class="mb-3">
                    <img :src="product.imageUrl" :alt="product.title">
                </div>
                <div>
                <h3 class="mb-3">{{ product.title }}</h3>
                <p class="text-muted">{{ product.content }}</p>
                <p>{{ product.description }}</p>
                </div>
                <div class="alert bg-warning-subtle mb-0">
                    <template v-if="product.origin_price !== product.price">
                        <span class="me-1">原價 </span>
                        <span class="text-muted text-decoration-line-through me-1">NT$ {{ product.origin_price }}</span>
                    </template>
                    <span>{{ product.price }} / {{ product.unit }}</span>
                </div>
            </div>
        </div>
    </div>
</div>

</template>