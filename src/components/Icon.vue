<template>
  <v-btn icon large>
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
