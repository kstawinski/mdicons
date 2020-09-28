<template>
  <v-row class="ma-3 d-flex">
    <span v-for="(icon, i) in icons" :key="i">
      <Icon :name="icon.name" />
    </span>
  </v-row>
</template>

<script lang="ts">
import Icon from '@/components/Icon.vue';
import Vue from 'vue';
import iconsJSON from '../data/icons.json';

export default Vue.extend({
  name: 'IconsList',

  components: {
    Icon,
  },

  data: () => ({
    icons: iconsJSON.slice(0, 1000),
  }),
});
</script>
