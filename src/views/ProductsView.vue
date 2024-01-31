<script>

// vue-loading-overlay

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

// pinia

import { mapState, mapActions } from 'pinia';

import productStore from '@/stores/productStore';
import cartStore from '@/stores/cartStore';
import loaderStore from '@/stores/loaderStore';

// component

import ProductModal from '@/components/ProductModal.vue';
import Pagination from '@/components/Pagination.vue';

export default {

  components: { Loading, ProductModal, Pagination },

  data() {

    return {

      productDetail: {}

    }

  },

  computed: {

    ...mapState(productStore, ['products']),
    ...mapState(loaderStore, ['isLoading']),

  },

  methods: {

    ...mapActions(productStore, ['getProductData']),
    ...mapActions(cartStore, ['addToCart']),

    showModal(product) {

      this.productDetail = product;
      this.$refs.productModal.showModal();
    
    },

    switchPage(num) { this.getProductData(num); }

  },

  mounted() { this.getProductData(); },

};

</script>

<template>

<Loading v-model:active="isLoading" :z-index="1000"></Loading>

<div class="my-3">
    <Pagination @switch-page="switchPage"></Pagination>
    <div class="row row-cols-3 g-4">
        <div class="col" v-for="product in products" :key="product.id">
            <div class="card h-100">
                <div class="card overflow-hidden">
                    <img class="card-img-top" :src="product.imageUrl" :alt="product.title">
                    <div class="position-absolute bottom-0 end-0">
                        <span class="badge bg-secondary py-2">{{ product.category }}</span>
                    </div>
                </div>
                <div class="card-body d-flex flex-column justify-content-between">
                    <div>
                        <div class="d-flex gap-2 mb-3">
                            <button class="btn badge bg-light text-dark border-0"
                                    v-for="tag in product.tags" :key="tag">
                            ＃{{ tag }}</button>
                        </div>
                        <h3 class="fs-5 mb-3">{{ product.title }}</h3>
                        <div class="mb-4">
                            <template v-if="product.origin_price !== product.price">
                                <span>原價 </span>
                                <span class="text-muted text-decoration-line-through">NT$ {{ product.origin_price }}</span>
                            </template>
                            <span class="arrow-animation"><span class="arrow">→</span></span>
                            <span>{{ product.price }} / {{ product.unit }}</span>
                        </div>
                    </div>
                    <div class="d-flex gap-3">
                        <button type="button" class="w-100 btn btn-outline-primary" @click="showModal(product)">
                        查看細節</button>
                        <button type="button" class="w-100 btn btn-outline-secondary"
                                @click="addToCart(product.id)">
                        加入購物車</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <ProductModal ref="productModal" :product="productDetail"></ProductModal>
</div>

</template>

<style lang="scss">

.card-img-top {

  height: 300px;
  object-fit: cover;
  transition: .3s ease-in-out;

  &:hover { transform: scale(1.2); }

}

.arrow-animation {

  position: relative;
  padding: 0 1rem;

}

.arrow {

  color: tomato;
  position: absolute;
  left: 0.25rem;
  animation: arrow-bounce 1s ease-out infinite;

}

@keyframes arrow-bounce {

  0%, 100% { left: 0.25rem } 25%, 75% { left: 0.5rem } 50% { left: 0.75rem }

}

</style>
