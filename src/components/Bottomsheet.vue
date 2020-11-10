<template>
  <div tabindex="-1" class="v-dialog__content v-dialog__content--active">
    <transition name="slide-y-transition">
      <div
        class="
          iconslist
          background
          pa-4 ma-5
          v-dialog v-bottom-sheet v-dialog--active v-dialog--persistent
        "
      >
        <article class="d-flex">
          <!-- Icon preview -->
          <div class="pa-5">
            <v-icon size="76" :color="iconColor">{{ `mdi-${icon.name}` }}</v-icon>

            <div class="mt-2 colors">
              <Color
                v-for="(color, i) in colors"
                :key="i"
                :color="color"
                @picked="selectColor"
              />
            </div>
          </div>

          <!-- Icon details -->
          <div style="width: 100%;">
            <!-- Icon name -->
            <header class="d-flex justify-space-between">
              <div class="text-h6 secondary--text">{{ icon.name }}</div>
              <v-menu
                transition="slide-y-transition"
                nudge-bottom="20"
                :close-on-content-click="true"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list dense style="padding: 3px;">
                  <v-list-item :link="true">
                    <v-list-item-icon>
                      <v-icon>mdi-link-variant</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>Show on MDI</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item :link="true">
                    <v-list-item-icon>
                      <v-icon>mdi-code-tags</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>Copy import code</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item :link="true">
                    <v-list-item-icon>
                      <v-icon>mdi-pencil-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>Copy name</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-menu>
            </header>

            <main>
              <!-- Icon code -->
              <prism
                language="javascript"
                :code="`import { mdi${formatNameToCode(icon.name)} } from '@mdi/js';`"
                :style="$vuetify.theme.dark ? 'background-color: #101010;' : ''"
              ></prism>

              <!-- Icon buttons -->
              <div class="mb-2">
                <!-- Button: Visit MDI -->
                <v-btn
                  :href="`https://materialdesignicons.com/icon/${icon.name}`"
                  elevation="0"
                  target="_blank"
                  class="mr-2"
                  text
                  color="secondary"
                >
                  <span>Visit MDI</span>
                  <v-icon
                    class="ml-2"
                    size="18"
                    style="opacity: 0.3"
                  >mdi-open-in-new</v-icon>
                </v-btn>
              </div>
            </main>

            <!-- Icon footer -->
            <footer class="text--secondary caption">
              {{ icon.codepoint }} ·
              by {{ icon.author }} (v{{ icon.version }})
            </footer>
          </div>
        </article>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Color from '@/components/Color.vue';

export default Vue.extend({
  name: 'Bottomsheet',

  components: {
    Color,
  },

  props: {
    icon: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    iconColor: 'secondary',
    colors: ['red', 'light-green', 'light-blue', 'white', 'grey darken-3'],
  }),

  methods: {
    formatNameToCode(name: string) {
      // Remove dashes and start each word with a capital letter
      return name.split('-').map((text) => text.charAt(0).toUpperCase() + text.slice(1)).join('');
    },
    selectColor(color: string) {
      this.iconColor = color;
    },
  },
});
</script>

<style lang="scss" scoped>
.iconslist {
  box-shadow: 0 0 150px var(--v-background-base);
  border-radius: 5px !important;
  position: absolute;
  bottom: 0;
  left: 0;

  @media (min-width: 1256px) {
    width: 50vw;
  }
}

.v-dialog__content {
  display: flex;
  justify-content: flex-start;
}
</style>
