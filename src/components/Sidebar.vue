<template>
  <v-row style="position: sticky; top: 100px; left: 0;">
    <!-- Search -->
    <v-text-field
      label="Search"
      prepend-inner-icon="mdi-magnify"
      hint="Keyword of the icon you are looking for"
      persistent-hint
      outlined
      v-model="search"
      @keypress="emitValue"
      @keyup="emitValue"
      @keydown="emitValue"
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
    // Emit search query to component with icons list
    emitValue() {
      eventBus.$emit('search', this.search);
    },
  },
});
</script>
