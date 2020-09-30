<template>
  <v-app>
    <Header />

    <v-main>
      <v-row class="ma-8">
        <v-col class="pr-12">
          <Sidebar />
        </v-col>
        <v-col cols="9" class="ml-auto">
          <IconsList />
          <About :state="showAbout" />
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
import IconsList from '@/components/IconsList.vue';
import About from '@/components/About.vue';
import eventBus from './plugins/eventBus';

export default Vue.extend({
  name: 'App',

  components: {
    Header,
    Sidebar,
    IconsList,
    About,
  },

  data: () => ({
    showAbout: false,
  }),

  methods: {
    // Check that user selected dark theme
    isDarkTheme() {
      const isDark = localStorage.getItem('darkmode');
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

      if (isDark === 'true' || prefersDark) {
        this.$vuetify.theme.dark = true;
      } else {
        this.$vuetify.theme.dark = false;
      }
    },
  },

  mounted() {
    this.isDarkTheme();
  },

  created() {
    // On click 'About' item in dropdown menu
    eventBus.$on('about', () => {
      // This spaghetti code solve problem with opening dialog a second time
      if (this.showAbout === true) {
        this.showAbout = false;
      }
      this.showAbout = true;
    });
  },
});
</script>
