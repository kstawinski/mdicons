<template>
  <v-app>
    <Header />

    <v-main>
      <IconsList />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from '@/components/Header.vue';
import IconsList from '@/components/IconsList.vue';

export default Vue.extend({
  name: 'App',

  components: {
    Header,
    IconsList,
  },

  data: () => ({
    //
  }),
});
</script>
