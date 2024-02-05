<script>

// pinia

import { mapState, mapActions } from 'pinia';

import loaderStore from '@/stores/loaderStore';

import orderStore from '@/stores/orderStore';

import cartStore from '@/stores/cartStore';

// component

import OrderForm from '@/components/OrderForm.vue';

export default {

    components: { OrderForm },

    computed: {

        ...mapState(loaderStore, ['isLoading']),

        ...mapState(orderStore, ['isDisplay']),

        ...mapState(cartStore, ['cartList']),

    },

    methods: {

        ...mapActions(orderStore, ['showForm']),

        ...mapActions(cartStore, ['getCartData', 'changeItemQty', 'deleteCartItem', 'deleteAll']),

    },

    mounted() { this.getCartData(); }

};

</script>

<template>

<Loading v-model:active="isLoading" :z-index="1000"></Loading>

<div class="py-5 my-5">
    <h3 class="my-5">購物車</h3>
    <div class="alert bg-secondary text-white" v-if="!cartList.carts.length">購物車內沒有商品</div>
    <table class="table align-middle" v-else>
        <thead>
            <tr>
            <th width="10%">刪除</th>
            <th width="45%">商品</th>
            <th width="10%" class="text-end">單價</th>
            <th width="15%" class="text-end">數量</th>
            <th width="10%" class="text-end">小計</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="cart in cartList.carts" :key="cart.id">
                <td>
                <button type="button" class="btn btn-outline-danger" @click="deleteCartItem(cart.id)">
                刪除</button>
                </td>
                <td>
                <img class="cart-img me-3" :src="cart.product.imageUrl" :alt="cart.product.title">
                {{ cart.product.title }}
                </td>
                <td class="text-end">
                NT$ {{ cart.product.price }}                    
                </td>
                <td class="ps-5">
                <div class="input-group">
                    <select class="form-select"
                            :value="cart.qty" @change="changeItemQty(cart, $event.target.value)">
                    <option v-for="i in 10*(Math.ceil((cart.qty+1)/10))" :key="i" :value="i">{{ i }}</option>
                    </select>
                    <span class="input-group-text">{{ cart.product.unit }}</span>
                </div>
                </td>
                <td class="text-end">NT$ {{ cart.total }}</td>
            </tr>
        </tbody>
        <tfoot>
            <tr class="fw-bold">
                <td colspan="5" class="py-3">
                <button type="button" class="btn btn-outline-danger" @click="deleteAll">清空購物車</button>
                    <div class="float-end d-flex justify-content-end align-items-center gap-3">
                    總計：NT$ {{ cartList.total }} 元
                    <button type="button" class="btn btn-danger" @click="showForm">送出訂單</button>
                </div>
                </td>
            </tr>
        </tfoot>
    </table>
    <template v-if="isDisplay && cartList.carts.length">
        <OrderForm :length="cartList.carts.length" />
    </template>
</div>

</template>

<style>

.cart-img {

  width: 200px;
  object-fit: cover;

}

</style>