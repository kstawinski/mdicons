<template>
  <v-app-bar app color="primary" dark flat>
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-spacer></v-spacer>

    <div class="d-flex mr-2">
      <v-icon>mdi-theme-light-dark</v-icon>
      <v-checkbox
        v-model="$vuetify.theme.dark"
        color="white"
        hide-details
      ></v-checkbox>
    </div>

    <v-menu transition="slide-y-transition" bottom :close-on-content-click="true">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list v-for="(button, i) in buttons" :key="i" dense>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>{{ button.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ button.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Header',

  data: () => ({
    title: 'Material Design Icons',
    buttons: [
      { name: 'Random icon', icon: 'mdi-shuffle' },
      { name: 'Random icon', icon: 'mdi-shuffle' },
    ],
  }),
});
</script>
