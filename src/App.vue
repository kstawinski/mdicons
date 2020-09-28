<template>
  <v-app>
    <Header />

    <v-main>
      <p>Lorem ipsum dolor sit amet</p>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from '@/components/Header.vue';

export default Vue.extend({
  name: 'App',

  components: {
    Header,
  },

  data: () => ({
    //
  }),
});
</script>
