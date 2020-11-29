<template>
    <v-form style="text-align:center; margin-bottom: 70px;">
      <v-text-field
        style="width:500px;"
        outlined
        color="black"
        @keydown.enter.prevent="addQuestion" class="question" v-if="showInstructions"
        placeholder="What research question do you have?" v-model="anotherQuestion">
      </v-text-field>
        <p class="red--text mt-0">{{ feedback }}</p>
    </v-form>
</template>
<script lang="ts">
import Vue from 'vue';
import { addQuestion, previewData } from '@/graphql/graphql';
// import gql from 'graphql-tag';
import gql from 'graphql-tag';

export default Vue.extend({
  name: 'AddQuestion',
  props: ['allTeam', 'preview', 'showInstructions'],
  apollo: {
  },
  data: () => ({
    anotherQuestion: null,
    obj: { name: null, links: [] },
    feedback: '',
  }),
  methods: {
    async addQuestion() {
      if (this.anotherQuestion) {
        const i = this.allTeam.team.findIndex(
          (x: {name: string}) => x.name === this.preview.teamName,
        );
        this.obj.name = this.anotherQuestion;
        this.obj.links = [];
        this.preview.questions.push(this.obj);
        this.feedback = '';
        this.anotherQuestion = null;
        this.obj = { name: null, links: [] };
        this.allTeam.team[i].totalQ = this.preview.questions.length;
        const sortedByQuestions = this.allTeam.team.sort(
          (a: { totalQ: number }, b: { totalQ: number }) => b.totalQ - a.totalQ,
        ).slice();
        const sortedByLinks = this.allTeam.team.sort(
          (a: { totalL: number }, b: { totalL: number }) => b.totalL - a.totalL,
        ).slice();
        await this.$apollo.mutate({
          mutation: addQuestion,
          // Parameters
          variables: {
            teamName: this.preview.teamName,
            questions: this.preview.questions,
            totalQ: this.preview.questions.length,
            team: this.allTeam.team,
            Top10: sortedByQuestions.slice(0, 10),
            Top20: sortedByQuestions.slice(10, 20),
            Top30: sortedByQuestions.slice(20, 30),
            Top40: sortedByQuestions.slice(30, 40),
            Top50: sortedByQuestions.slice(40, 50),
            Top60: sortedByQuestions.slice(50, 60),
            Top70: sortedByQuestions.slice(60, 70),
            Top80: sortedByQuestions.slice(70, 80),
            Top90: sortedByQuestions.slice(80, 90),
            Top100: sortedByQuestions.slice(90, 100),
            LinksTop10: sortedByLinks.slice(0, 10),
            LinksTop20: sortedByLinks.slice(10, 20),
            LinksTop30: sortedByLinks.slice(20, 30),
            LinksTop40: sortedByLinks.slice(30, 40),
            LinksTop50: sortedByLinks.slice(40, 50),
            LinksTop60: sortedByLinks.slice(50, 60),
            LinksTop70: sortedByLinks.slice(60, 70),
            LinksTop80: sortedByLinks.slice(70, 80),
            LinksTop90: sortedByLinks.slice(80, 90),
            LinksTop100: sortedByLinks.slice(90, 100),
          },
          // Update the cache with the result
          // The query will be updated with the optimistic response
          // and then with the real result of the mutation
          update: (store, { data: { updateOnePreview } }) => {
            // Read the data from our cache for this query.
            const data: any = store.readQuery({
              query: previewData,
              variables: {
                teamName: 'Team Ninjas',
              },
            });
            // Add our tag from the mutation to the end
            data.preview.totalQ = updateOnePreview.totalQ;
            // Write our data back to the cache.
            store.writeQuery({
              query: previewData,
              data,
              variables: {
                teamName: 'Team Ninjas',
              },
            });
          },
        });
      } else {
        this.feedback = 'You must type a question first';
      }
    },
  },
});
</script>
<style scoped>
.question{
  width: 400px;
}

.question >>> :placeholder-shown {
    font-size: 1.7em;
}
</style>
