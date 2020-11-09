<template>
  <v-row style="position: sticky; top: 100px; left: 0;">
    <!-- Search -->
    <v-text-field
      label="Search..."
      autofocus
      filled
      hide-details
      v-model="search"
      @keypress="emitValue"
      @keyup="emitValue"
      @keydown="emitValue"
    ></v-text-field>

    <!-- Outline only -->
    <v-switch
      v-model="outlineOnly"
      label="Outline icons only"
      hide-details
      @change="emitOutline()"
    ></v-switch>
  </v-row>
</template>

<script lang='ts'>
import Vue from 'vue';
import eventBus from '../plugins/eventBus';

export default Vue.extend({
  name: 'Sidebar',

  data: () => ({
    search: undefined,
    outlineOnly: false,
  }),

  methods: {
    // Emit search query to component with icons list
    emitValue() {
      eventBus.$emit('search', this.search);
    },
    // Emit change of displaying (only outline or all)
    emitOutline() {
      eventBus.$emit('outline', this.outlineOnly);
    },
  },
});
</script>
