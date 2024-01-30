<script>

import './assets/all.scss';

import Navbar from './components/Navbar.vue';

export default {

  components: { Navbar },

};

</script>

<template>

    <Navbar />
    <div class="container">
        <RouterView />
    </div>

</template>
