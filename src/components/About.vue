<template>
  <v-dialog
    v-model="state"
    width="600px"
  >
    <v-card>
      <v-card-title>
        <span class="headline">About project 🚀</span>
      </v-card-title>
      <v-card-text>
        <p>
          I am very pleased that you are using my application. The idea behind the app
          is very simple - I wanted to create a Material Design icon picker faster
          than the official one. I think I managed 😜
        </p>

        <p>
          The application has several functions:
          <ol>
            <li>
              <b class="white--text">preview information about the icon</b>
              selected by clicking, such as: name, code used to import
              it, author or version,
            </li>

            <li>
              <b class="white--text">randomize the icon</b> after pressing a slash,
            </li>

            <li>
              <b class="white--text">icon search</b> by matching the phrase entered
              in the search engine to the icon name.</li>
          </ol>
        </p>

        <p>
          I am planning on adding some features. If you want, we can discuss them
          via Issues in the project repository.
        </p>

        <p>
          I would be very grateful if you decide to add your piece of code to the
          app. The project is open-source, I invite you to contribute! 👐
        </p>

        <v-btn
          color="primary"
          text
          :link="true"
          target="_blank"
          href="https://github.com/kstawinski/mdicons"
        >
          <v-icon class="mr-2" size="17">mdi-github</v-icon>
          Repository
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'About',

  props: {
    state: Boolean,
  },
});
</script>
