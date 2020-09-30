<template>
  <v-row>
    <v-bottom-sheet v-model="sheet">
      <v-sheet class="pa-4" v-if="sheet">
        <article class="d-flex">
          <!-- Icon preview -->
          <div class="pa-5">
            <v-icon size="76" color="secondary">{{ `mdi-${pickedIcon.name}` }}</v-icon>
          </div>

          <!-- Icon details -->
          <div>
            <!-- Icon name -->
            <header
              class="text-h6 secondary--text"
              style="cursor: pointer;"
            >
              {{ pickedIcon.name }}
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
                  elevation="1"
                  target="_blank"
                  class="mr-2"
                  text
                  color="secondary"
                >
                  <span>Visit MDI</span>
                  <v-icon class="ml-2" size="18">mdi-open-in-new</v-icon>
                </v-btn>

                <!-- Button: Copy code -->
                <v-btn
                  elevation="1"
                  text
                  color="secondary"
                >
                  <span>Copy code</span>
                  <v-icon class="ml-2" size="18">mdi-clipboard-text-outline</v-icon>
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
      </v-sheet>
    </v-bottom-sheet>

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
import Vue from 'vue';
import searchArray from 'search-in-array';
import eventBus from '../plugins/eventBus';
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
    search: undefined,
  }),

  methods: {
    pickIcon(iconObject: object) {
      this.pickedIcon = iconObject;
      this.sheet = true;
    },
    formatNameToCode(name: string) {
      return name.split('-').map((text) => text.charAt(0).toUpperCase() + text.slice(1)).join('');
    },
    getRandomInt(paramMin: number, paramMax: number) {
      const min = Math.ceil(paramMin);
      const max = Math.floor(paramMax);
      return Math.floor(Math.random() * (max - min)) + min;
    },
    randomIcon() {
      const randomInt = this.getRandomInt(0, this.icons.length);
      this.pickIcon(this.icons[randomInt]);
    },
    getIconsList(searchQuery: any) {
      if (searchQuery === '' || searchQuery === undefined || searchQuery === null || searchQuery.length < 3) {
        return iconsJSON.slice(0, 100);
      }
      return searchArray.getSearchResult(searchQuery, iconsJSON, 'name');
    },
  },

  created() {
    // On click 'Random icon' item in dropdown menu
    eventBus.$on('random', () => {
      this.randomIcon();
    });

    // On enter value>3 in search field
    eventBus.$on('search', (value: string) => {
      this.search = value;
    });
  },

  mounted() {
    window.addEventListener('keyup', (event) => {
      // On space click
      if (event.keyCode === 32) {
        this.randomIcon();
      }
    });
  },
});
</script>
