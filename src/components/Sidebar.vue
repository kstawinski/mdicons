<template>
  <v-row>
    <!-- Search -->
    <v-text-field
      label="Search"
      prepend-inner-icon="mdi-magnify"
      hint="Keywords for icon what you are looking for."
      persistent-hint
      outlined
      clearable
      v-model="search"
      @keypress="emitValue"
    ></v-text-field>
  </v-row>
</template>

<script lang='ts'>
import Vue from 'vue';
import eventBus from '../plugins/eventBus';

export default Vue.extend({
  name: 'Sidebar',

  data: () => ({
    search: undefined,
  }),

  methods: {
    emitValue() {
      if (this.search.length >= 3) {
        eventBus.$emit('search', this.search);
      }
    },
  },
});
</script>
