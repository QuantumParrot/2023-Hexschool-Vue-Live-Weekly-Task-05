<script>

import { mapState } from 'pinia';

import cartStore from '@/stores/cartStore';

export default {

    computed: {

        ...mapState(cartStore, ['cartList'])
        
    },

    // mounted() { console.log(this.cartList) }

}

</script>

<template>

<nav class="navbar bg-warning-subtle p-4">
    <div class="container-fluid">
        <span class="navbar-brand fw-bold mb-0">收藏家</span>
        <ul class="d-flex align-items-center gap-4 list-unstyled mb-0">
            <li class="nav-item">
                <RouterLink class="nav-link" aria-current="page" to="/">商品列表</RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink class="nav-link d-flex align-items-center" to="/carts">
                    <span class="me-2">購物車</span>
                    <span class="badge text-bg-danger">{{ cartList.carts.length }}</span>
                </RouterLink>
            </li>
        </ul>
    </div>
</nav> 

</template>