<template>
  <v-container class="module-metrics">
    <div class="module-metrics__container">
      <h2 style="text-align:center; margin-bottom: 30px">Total Students: {{ totalStudents }}</h2>
      <v-layout row wrap style="text-align:center">
        <v-flex xs6>
          <h2 style="text-decoration: underline;">Average Questions</h2>
        </v-flex>
        <v-flex xs6>
          <h2 style="text-decoration: underline;">Average Links</h2>
        </v-flex>
      </v-layout>
      <v-layout row wrap style="text-align:center">
        <v-flex xs6>
          <h2>{{ avgQ }}</h2>
        </v-flex>
        <v-flex xs6>
          <h2>{{ avgL }}</h2>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import gql from 'graphql-tag';

export default Vue.extend({
  name: 'ModuleMetrics',
  apollo: {
  },
  data: () => ({
    totalStudents: '84',
    avgQ: '145',
    avgL: '211',
  }),
});
</script>
