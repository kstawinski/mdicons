<template>
  <v-row>
    <div tabindex="-1" class="v-dialog__content v-dialog__content--active">
      <transition name="bottom-sheet-transition">
        <div
          class="
            iconslist
            background
            pa-4 ma-5
            v-dialog v-bottom-sheet v-dialog--active v-dialog--persistent
          "
          v-if="sheet"
        >
          <article class="d-flex">
            <!-- Icon preview -->
            <div class="pa-5">
              <v-icon size="76" :color="iconColor">{{ `mdi-${pickedIcon.name}` }}</v-icon>

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
            <div>
              <!-- Icon name -->
              <header class="d-flex justify-space-between">
                <div class="text-h6 secondary--text">{{ pickedIcon.name }}</div>
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
                  :code="`import { mdi${formatNameToCode(pickedIcon.name)} } from '@mdi/js';`"
                  :style="$vuetify.theme.dark ? 'background-color: #101010;' : ''"
                ></prism>

                <!-- Icon buttons -->
                <div class="mb-2">
                  <!-- Button: Visit MDI -->
                  <v-btn
                    :href="`https://materialdesignicons.com/icon/${pickedIcon.name}`"
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
                {{ pickedIcon.codepoint }} ·
                by {{ pickedIcon.author }} (v{{ pickedIcon.version }})
              </footer>
            </div>
          </article>
        </div>
      </transition>
    </div>

    <v-row>
      <Icon
        v-for="(icon, i) in getIconsList(this.search)"
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
import Color from '@/components/Color.vue';
import Vue from 'vue';
import searchArray from 'search-in-array';
import eventBus from '../plugins/eventBus';
import iconsJSON from '../data/icons.json';

export default Vue.extend({
  name: 'IconsList',

  components: {
    Icon,
    Color,
  },

  data: () => ({
    iconsCount: 350,
    pickedIcon: {},
    sheet: false,
    outlineOnly: false,
    search: '',
    iconColor: 'secondary',
    colors: ['red', 'light-green', 'light-blue', 'white', 'grey darken-3'],
  }),

  methods: {
    pickIcon(iconObject: object) {
      this.pickedIcon = iconObject;

      // Show bottom sheet
      this.sheet = true;
    },
    formatNameToCode(name: string) {
      // Remove dashes and start each word with a capital letter
      return name.split('-').map((text) => text.charAt(0).toUpperCase() + text.slice(1)).join('');
    },
    getRandomInt(paramMin: number, paramMax: number) {
      const min = Math.ceil(paramMin);
      const max = Math.floor(paramMax);
      return Math.floor(Math.random() * (max - min)) + min;
    },
    randomIcon() {
      // Generate random number from the range (0, all icons)
      const randomInt = this.getRandomInt(0, this.iconsCount);

      // Pick icon with index generated above
      this.pickIcon(iconsJSON[randomInt]);
    },
    getIconsList(searchQuery: string|null|undefined) {
      // If search query is null/undefined/empty/shorten than 3 chars
      if (searchQuery === '' || searchQuery === undefined || searchQuery === null || searchQuery.length < 3) {
        if (this.outlineOnly) {
          return iconsJSON.slice(0, this.iconsCount * 3.5).filter((icon) => icon.name.includes('-outline'));
        }
        return iconsJSON.slice(0, this.iconsCount);
      }
      // If not - return filtered array
      if (this.outlineOnly) {
        return searchArray.getSearchResult(searchQuery, iconsJSON, 'name').filter((icon) => icon.name.includes('-outline'));
      }
      return searchArray.getSearchResult(searchQuery, iconsJSON, 'name');
    },
    scroll() {
      window.onscroll = () => {
        const docEl = document.documentElement;
        const bottomOfWindow = docEl.scrollTop + window.innerHeight === docEl.offsetHeight;

        if (bottomOfWindow) {
          this.iconsCount += 50;
        }
      };
    },
    selectColor(color: string) {
      this.iconColor = color;
    },
  },

  created() {
    // On click 'Random icon' item in dropdown menu
    eventBus.$on('random', () => {
      this.randomIcon();
    });

    // On enter some in search query
    eventBus.$on('search', (value: string) => {
      this.search = value;
    });

    // On "outline only" switch change
    eventBus.$on('outline', (state: boolean) => {
      this.outlineOnly = state;
    });

    // Monitor scroll
    this.scroll();
  },

  mounted() {
    window.addEventListener('keyup', (event) => {
      // On slash click
      if (event.keyCode === 191) {
        this.randomIcon();
      }
    });
  },
});
</script>

<style lang="scss" scoped>
.colors {
  opacity: 0.4;
  transition: 0.3s opacity;

  &:hover {
    opacity: 1;
  }
}

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
