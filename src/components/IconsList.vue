<template>
  <v-row>
    <v-bottom-sheet v-model="sheet">
      <v-sheet class="pa-4 ma-auto">
        <div class="d-flex">
          <!-- Picked icon preview -->
          <div class="pa-5">
            <v-icon size="76" color="blue-grey darken-4">{{ `mdi-${pickedIcon.name}` }}</v-icon>
          </div>

          <div>
            <!-- Name -->
            <span
              class="text-h6 blue-grey--text text--darken-4"
              style="cursor: pointer;"
              @click="copyToClipboard(`${pickedIcon.name}`)"
            >
              {{ `${pickedIcon.name}` }}
            </span>

            <!-- Code -->
            <prism
              language="javascript"
              :code="`import { mdi-${this.pickedIcon.name} } from '@mdi/js';`"
            ></prism>

            <!-- Details -->
            <div>
              <div>
                <!-- Link to MDI -->
                <v-btn
                  :href="`https://materialdesignicons.com/icon/${pickedIcon.name}`"
                  elevation="1"
                  target="_blank"
                  class="mr-2"
                >
                  <span>Visit MDI</span>
                  <v-icon class="ml-2" size="18">mdi-open-in-new</v-icon>
                </v-btn>

                <!-- Copy name -->
                <v-btn
                  elevation="1"
                  @click="copyToClipboard(`code here`)"
                >
                  <span>Copy code</span>
                  <v-icon class="ml-2" size="18">mdi-clipboard-text-outline</v-icon>
                </v-btn>
              </div>

              <div class="text--secondary mt-1">
                <small>
                  {{ pickedIcon.codepoint }} ·
                  by {{ pickedIcon.author }} (v{{ pickedIcon.version }})
                </small>
              </div>
            </div>
          </div>
        </div>

        <!-- Snackbar -->
        <v-snackbar
          v-model="snackbar.isVisible"
          :timeout="snackbar.timeout"
          class="mr-4 pb-4"
        >
          <b>{{ snackbar.value }}</b> {{ snackbar.text }}
        </v-snackbar>
      </v-sheet>
    </v-bottom-sheet>
    <v-row class="ma-3">
      <Icon
        v-for="(icon, i) in icons"
        :key="i"
        :name="icon.name"
        @clicked="pickIcon(icon)"
      />
    </v-row>
  </v-row>
</template>

<script lang="ts">
import '@/assets/prism.css';
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
    sheet: false,
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
      this.sheet = true;
    },
    copyToClipboard(text: any) {
      this.clipboardCopy(text);
      this.snackbar.value = this.pickedIcon.name;
      this.snackbar.isVisible = true;
    },
  },
});
</script>
