<template>
  <v-container fluid>
    <div v-for='(icon, i) in icons' :key='i'>
      <v-icon>{{ `mdi-${icon.name}` }}</v-icon>
    </div>
  </v-container>
</template>

<script lang='ts'>
import Vue from 'vue';

export default Vue.extend({
  name: 'IconsList',

  data: () => ({
    icons: [
      {
        id: 'CBFA6722-0EE6-49B4-B5C2-0B177A5523C2',
        name: 'ab-testing',
        codepoint: 'F01C9',
        aliases: [],
        tags: [
          'Developer Languages',
        ],
        author: 'Michael Richins',
        version: '4.0.96',
      },
      {
        id: 'E20665F3-5354-46C2-9162-4202B20DCA05',
        name: 'abjad-arabic',
        codepoint: 'F1328',
        aliases: [
          'writing-system-arabic',
        ],
        tags: [
          'Alpha Numeric',
        ],
        author: 'Haley Halcyon',
        version: '4.9.95',
      },
      {
        id: 'FC508376-0233-498A-ABF8-B289241031FF',
        name: 'abjad-hebrew',
        codepoint: 'F1329',
        aliases: [
          'writing-system-hebrew',
        ],
        tags: [
          'Alpha Numeric',
        ],
        author: 'Haley Halcyon',
        version: '4.9.95',
      },
    ],
  }),
});
</script>
