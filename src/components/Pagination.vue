<script>

import { mapState } from 'pinia';

import productStore from '@/stores/productStore';

export default {

    computed: {

        ...mapState(productStore, ['pagination']),

    },

    methods: {

    switchPage(num) { this.$emit('switch-page', num) }

    }

}

</script>

<template>

<nav aria-label="page navigation" class="my-5">
    <ul class="pagination">
        <li class="page-item" :class="{ 'disabled': !pagination.has_pre }">
            <a class="page-link" href="#" aria-label="Previous"
               @click.prevent="switchPage(pagination.current_page - 1)">
            <span aria-hidden="true">&laquo;</span></a>
        </li>
        <template v-for="i in pagination.total_pages" :key="i">
            <li class="page-item" :class="{ 'active': pagination.current_page === i }">
                <a class="page-link" href="#" @click.prevent="switchPage(i)">{{ i }}</a>
            </li>
        </template>
        <li class="page-item" :class="{ 'disabled': !pagination.has_next }">
            <a class="page-link" href="#" aria-label="Next"
               @click.prevent="switchPage(pagination.current_page + 1)">
            <span aria-hidden="true">&raquo;</span></a>
        </li>
    </ul>
</nav>

</template>