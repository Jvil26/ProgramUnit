<template>
    <div>
      <v-card>
        <v-card-title>{{ selectedName }}</v-card-title>
    <v-data-table
        style="margin-top: 50px"
        :headers="headers"
        :items="filteredQuestions"
        :items-per-page="5"
        class="elevation-1">
        <template #item.links="{ value }">
            <a style="color:black" v-for="(link, i) in value"
            :key="i" target="_blank" :href="value[i]">
              {{ value[i] }}
            </a>
        </template>
        </v-data-table>
        </v-card>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
// import gql from 'graphql-tag';

export default Vue.extend({
  name: 'Questions+LinksData',
  props: ['teams', 'headers', 'questions', 'selectedName'],
  apollo: {
  },
  data: () => ({
  }),
  computed: {
    filteredQuestions() {
      return this.questions.filter((question) => question.teamName === this.selectedName);
    },
  },
});
</script>
