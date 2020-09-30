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
    ></v-text-field>
  </v-row>
</template>

<script lang='ts'>
import Vue from 'vue';

export default Vue.extend({
  name: 'Sidebar',
});
</script>
