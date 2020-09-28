<template>
  <v-row class="ma-3 d-flex">
    <v-col cols="3">
      <!-- Picked icon preview -->
      <span class="rounded-circle d-inline-block text-center grey lighten-5 pa-5">
        <v-icon size="76" color="secondary">{{ `mdi-${pickedIcon.name}` }}</v-icon>
      </span>

      <!-- Name -->
      <div class="mt-2 mb-4 text-h6">
        {{ `${pickedIcon.name}` }}
      </div>

      <!-- Code -->
      <prism
        language="javascript"
        :code="`import { mdi-${this.pickedIcon.name} } from '@mdi/js';`"
      ></prism>

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
        <v-btn block text elevation="0" @click="copyToClipboard(`${pickedIcon.name}`)">
          <v-icon>mdi-clipboard-text-outline</v-icon>
          <span class="ml-2">Copy name</span>
        </v-btn>
      </div>

      <!-- Snackbar -->
      <v-snackbar v-model="snackbar.isVisible" :timeout="snackbar.timeout" left class="ml-4 pb-4">
        <b>{{ snackbar.value }}</b> {{ snackbar.text }}
      </v-snackbar>
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
import 'prismjs/themes/prism.css';
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
    snackbar: {
      isVisible: false,
      text: 'copied successfully.',
      value: undefined,
      timeout: 3000,
    },
  }),

  methods: {
    pickIcon(iconObject: object) {
      this.pickedIcon = iconObject;
    },
    copyToClipboard(text: any) {
      this.clipboardCopy(text);
      this.snackbar.value = this.pickedIcon.name;
      this.snackbar.isVisible = true;
    },
  },
});
</script>
