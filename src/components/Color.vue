<template>
  <v-btn
    icon
    x-small
    :color="color"
    @click="emitColor()"
  >
    <v-icon>mdi-circle-medium</v-icon>
  </v-btn>
</template>

<script lang='ts'>
import Vue from 'vue';

export default Vue.extend({
  name: 'Color',

  props: {
    color: {
      type: String,
      required: true,
    },
  },

  methods: {
    emitColor() {
      this.$emit('picked', this.color);
    },
  },
});
</script>
