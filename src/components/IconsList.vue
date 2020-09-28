<template>
  <v-row>
    <v-bottom-sheet v-model="sheet">
      <v-sheet class="pa-4">
        <div class="d-flex">
          <!-- Picked icon preview -->
          <div class="pa-5">
            <v-icon size="76" color="secondary">{{ `mdi-${pickedIcon.name}` }}</v-icon>
          </div>

          <!-- Details -->
          <div>
            <!-- Name -->
            <span
              class="text-h6 secondary--text"
              style="cursor: pointer;"
              @click="this.clipboardCopy(this.pickedIcon.name)"
            >
              {{ pickedIcon.name }}
            </span>

            <!-- Code -->
            <prism
              language="javascript"
              :code="`import { mdi-${this.pickedIcon.name} } from '@mdi/js';`"
            ></prism>

            <!-- Buttons -->
            <div>
              <div>
                <!-- Link to MDI -->
                <v-btn
                  :href="`https://materialdesignicons.com/icon/${pickedIcon.name}`"
                  elevation="1"
                  target="_blank"
                  class="mr-2"
                  text
                  color="secondary"
                >
                  <span>Visit MDI</span>
                  <v-icon class="ml-2" size="18">mdi-open-in-new</v-icon>
                </v-btn>

                <!-- Code copy button -->
                <v-btn
                  elevation="1"
                  @click="copyToClipboard('code here')"
                  text
                  color="secondary"
                >
                  <span>Copy code</span>
                  <v-icon class="ml-2" size="18">mdi-clipboard-text-outline</v-icon>
                </v-btn>
              </div>

              <!-- Footer -->
              <small class="text--secondary mt-1">
                {{ pickedIcon.codepoint }} ·
                by {{ pickedIcon.author }} (v{{ pickedIcon.version }})
              </small>
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
    <v-row class="ma-8">
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
    copyToClipboard(text: string) {
      this.clipboardCopy(text);
      this.snackbar.value = this.pickedIcon.name;
      this.snackbar.isVisible = true;
    },
  },
});
</script>
