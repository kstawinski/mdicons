<template>
  <v-row class="ma-3 d-flex">
    <v-col cols="3">
      <!-- Picked icon preview -->
      <span class="rounded-circle d-inline-block text-center">
        <v-icon size="36" color="primary">{{ `mdi-${pickedIcon.name}` }}</v-icon>
      </span>

      <!-- Name -->
      <span class="mt-2">
        {{ `mdi-${pickedIcon.name}` }}
      </span>

      <!-- Code -->
      <code>
        import { {{ `mdi-${pickedIcon.name}` }} } from '@mdi/js';
      </code>

      <!-- Details -->
      <div>
        <!-- Link to MDI -->
        <v-btn
          :href="`https://materialdesignicons.com/icon/${pickedIcon.name}`"
          elevation="0"
          block
          text
          target="_blank"
        >
          <v-icon>mdi-open-in-new</v-icon>
          <span class="ml-2">Show on MDI</span>
        </v-btn>

        <!-- Copy name -->
        <v-btn block text elevation="0" @click="copyToClipboard(`mdi-${pickedIcon.name}`)">
          <v-icon>mdi-clipboard-text-outline</v-icon>
          <span class="ml-2">Copy name</span>
        </v-btn>
      </div>
    </v-col>
    <v-col cols="9">
      <Icon
        v-for="(icon, i) in icons"
        :key="i"
        :name="icon.name"
        @clicked="pickIcon(icon)"
      />
    </v-col>
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
    icons: iconsJSON.slice(0, 100),
    pickedIcon: {},
  }),

  methods: {
    pickIcon(iconObject: object) {
      this.pickedIcon = iconObject;
    },
    copyToClipboard(text: any) {
      this.clipboardCopy(text);
    },
  },
});
</script>
