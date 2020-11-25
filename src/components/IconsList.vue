<template>
    <v-row>
      <v-slide-y-reverse-transition>
        <Bottomsheet v-if="sheet" :icon="pickedIcon" />
      </v-slide-y-reverse-transition>
      <Icon
        v-for="(icon, i) in getIconsList(this.search)"
        :key="i"
        :name="icon.name"
        @clicked="pickIcon(icon)"
      />
    </v-row>
</template>

<script lang="ts">
import '@/assets/prism.css';
import Bottomsheet from '@/components/Bottomsheet.vue';
import Icon from '@/components/Icon.vue';
import Vue from 'vue';
import searchArray from 'search-in-array';
import eventBus from '../plugins/eventBus';
import iconsJSON from '../data/icons.json';

export default Vue.extend({
  name: 'IconsList',

  components: {
    Bottomsheet,
    Icon,
  },

  data: () => ({
    iconsCount: 350,
    pickedIcon: {},
    sheet: false,
    outlineOnly: false,
    search: '',
  }),

  methods: {
    pickIcon(iconObject: object) {
      this.pickedIcon = iconObject;

      // Show bottom sheet
      this.sheet = true;
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
</style>
