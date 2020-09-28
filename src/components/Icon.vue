<template>
  <v-btn icon large class="ma-1" tile>
    <v-icon>{{ `mdi-${name}` }}</v-icon>
  </v-btn>
</template>

<script lang='ts'>
import Vue from 'vue';

export default Vue.extend({
  name: 'Icon',

  props: {
    name: {
      type: String,
      required: true,
    },
  },
});
</script>
