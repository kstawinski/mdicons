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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque purus ex,
        feugiat mollis vehicula a, dignissim at dui. Maecenas sed sem quam. Aenean
        maximus tortor vulputate eros porta ultrices id quis dolor. Cras quis laoreet
        leo. Fusce tincidunt tortor id dignissim gravida. Nulla interdum nunc at orci
        ornare, vitae rutrum mi ultricies. Praesent blandit ornare odio non sagittis.
        Nam in mi ac quam volutpat commodo sit amet et eros. Interdum et malesuada
        fames ac ante ipsum primis in faucibus. Maecenas tincidunt tortor sit amet cursus
        sollicitudin. Nulla lobortis velit urna, nec scelerisque mauris dapibus et.
        Curabitur mollis risus a congue rhoncus. Phasellus sit amet tortor vestibulum,
        maximus ligula feugiat, ultricies ex. Ut quis auctor tellus, nec lobortis justo.
      </v-card-text>
      <!-- <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="green darken-1"
          text
          @click="dialog = false"
        >
          Disagree
        </v-btn>
        <v-btn
          color="green darken-1"
          text
          @click="$emit('close')"
        >
          Agree
        </v-btn>
      </v-card-actions> -->
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
