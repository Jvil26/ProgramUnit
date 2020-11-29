<template>
  <v-container class="module-default">
    <div class="module-default__instructions">
      <v-expansion-panels class="module-default__instructions"
      flat v-model="showInstructions">
        <v-expansion-panel>
          <v-expansion-panel-header v-show="showInstructions"
          @click="showInstructions = false"
          hide-actions class="pa-0">
            <template v-slot="{open}">
              <v-scroll-y-transition hide-on-leave>
                <div v-if="!open" class="d-flex flex-column justify-center">
                  <v-icon>
                    mdi-chevron-down
                  </v-icon>
                  <div
                  class="text-uppercase
                  font-weight-bold text-subtitle-2
                  secondary--text text-center mt-0">
                      Instructions
                  </div>
                </div>
              </v-scroll-y-transition>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <module-instruct readonly/>
            <div @click="showInstructions = true">
              <div class="text-uppercase
              font-weight-bold text-subtitle-2
              secondary--text text-center">
                close
              </div>
              <!-- <div class="hr"/> OPTIONAL -->
              <v-icon class="d-flex secondary--text justify-center">
                mdi-chevron-up
              </v-icon>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <div class="module-default__container">
      <div v-if="$apollo.loading">Loading...</div>
      <div v-if="preview && allTeam">
      <AddQuestion :preview="preview" :allTeam="allTeam"
      :showInstructions="showInstructions" />
          <div v-if="showInstructions">
          <v-expansion-panels
          class="panels" v-for="(question, i) in preview.questions" :key="i">
        <v-dialog v-model="dialog" :retain-focus="false" max-width="290">
          <template v-slot:activator="{ on }">
          <v-expansion-panel style="border: 1px solid black">
      <v-expansion-panel-header>
        <v-icon class="delete" align-center
            v-on="on" @click="passData(question)">clear</v-icon>
        <h4 style="text-align:center; text-transform:capitalize">{{ question.name }}</h4>
      </v-expansion-panel-header>
      <v-expansion-panel-content style="margin-left: 20px">
        <div v-for="(link, k) in question.links" :key="k">
          <a class="search" target="_blank" :href="question.links[k]">
            <v-icon>forward</v-icon>
            </a>
          <p style="font-size:0.8em;">{{ question.links[k] }}</p>
      </div>
        </v-expansion-panel-content>
          <v-expansion-panel-content>
      <v-form>
        <v-text-field
        @keydown.enter.prevent="addLink(i)"
        color="black"
        placeholder="Log research link here"
        v-model="anotherLink"
        :disabled="disabled == 0"
        ></v-text-field>
    <p style="text-align:center" class="red--text mt-0">{{ Lfeedback }}</p>
    </v-form>
    </v-expansion-panel-content>
    </v-expansion-panel>
          </template>
          <v-card>
        <v-card-title class="headline">Delete this Question?</v-card-title>
        <v-card-text>You will lose all your saved links
          for this question if you confirm</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">Cancel</v-btn>
          <v-btn color="green darken-1" text @click="dialog = false;
          deleteQuestion();">
            Confirm</v-btn>
        </v-card-actions>
      </v-card>
            </v-dialog>
          </v-expansion-panels>
          </div>
    </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
// import gql from 'graphql-tag';
import gql from 'graphql-tag';
import {
  deleteQuestion, addLink, previewData, queryAllTeam, linkQuery,
} from '@/graphql/graphql';
import AddQuestion from './AddQuestion.vue';
import Instruct from './ModuleInstruct.vue';

export default Vue.extend({
  name: 'ModuleDefault',
  components: {
    'module-instruct': Instruct,
    AddQuestion,
  },
  apollo: {
    preview: {
      query: previewData,
      variables: {
        teamName: 'Team Ninjas',
      },
    },
    allTeam: {
      query: queryAllTeam,
    },
    link: {
      query: linkQuery,
    },
  },
  data: () => ({
    preview: { questions: [{ name: '', links: [''] }], teamName: '', totalL: 0 },
    allTeam: { team: [{ name: '', totalL: 0, totalQ: 0 }] },
    disabled: -1,
    delete: '',
    showInstructions: true,
    dialog: false,
    Lfeedback: '',
    anotherLink: '',
  }),
  methods: {
    checkDisabled(totalQ: number, numQuestions: number) {
      if (totalQ >= numQuestions) {
        this.Lfeedback = '';
        this.disabled = 1;
      } else if (totalQ < numQuestions) {
        this.disabled = 0;
        this.Lfeedback = `You must log ${numQuestions} questions to be able to log links`;
      }
    },
    passData(question: { name: string }) {
      this.delete = question.name;
    },
    async deleteQuestion() {
      const i = this.preview.questions.findIndex((x: {name: string}) => x.name === this.delete);
      const k = this.allTeam.team.findIndex(
        (x: {name: string}) => x.name === this.preview.teamName,
      );
      this.preview.totalL -= this.preview.questions[i].links.length;
      this.preview.questions = this.preview.questions.filter(
        (item: {name: string}) => item.name !== this.delete,
      );
      this.allTeam.team[k].totalQ = this.preview.questions.length;
      this.allTeam.team[k].totalL = this.preview.totalL;
      const sortedByQuestions = this.allTeam.team.sort(
        (a: { totalQ: number }, b: { totalQ: number }) => b.totalQ - a.totalQ,
      ).slice();
      const sortedByLinks = this.allTeam.team.sort(
        (a: { totalL: number }, b: { totalL: number }) => b.totalL - a.totalL,
      ).slice();
      console.log(sortedByQuestions);
      console.log(sortedByLinks);
      await this.$apollo.mutate({
        // Query
        mutation: deleteQuestion,
        // Parameters
        variables: {
          teamName: this.preview.teamName,
          questions: this.preview.questions,
          totalL: this.preview.totalL,
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
    },
    async addLink(i: number) {
      if (this.anotherLink) {
        this.preview.questions[i].links.push(this.anotherLink);
        const k = this.allTeam.team.findIndex((x) => x.name === this.preview.teamName);
        this.preview.totalL += 1;
        this.allTeam.team[k].totalL = this.preview.totalL;
        const sortedByQuestions = this.allTeam.team.sort(
          (a: { totalQ: number }, b: { totalQ: number }) => b.totalQ - a.totalQ,
        ).slice();
        const sortedByLinks = this.allTeam.team.sort(
          (a: { totalL: number }, b: { totalL: number }) => b.totalL - a.totalL,
        ).slice();
        await this.$apollo.mutate({
          // Query
          mutation: addLink,
          // Parameters
          variables: {
            link: this.anotherLink,
            team: this.allTeam.team,
            questions: this.preview.questions,
            totalL: this.preview.totalL,
            teamName: this.preview.teamName,
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
        });
        this.anotherLink = '';
        this.Lfeedback = '';
      } else {
        this.Lfeedback = 'You must enter a research link';
      }
    },
  },
  mounted() {
    window.setInterval(async () => {
      const outComes = await this.$apollo.query({
        query: linkQuery,
      });
      const result = await this.$apollo.query({
        query: previewData,
        variables: {
          teamName: 'Team Ninjas',
        },
      });
      this.checkDisabled(result.data.preview.totalQ, outComes.data.link.numQuestions);
    }, 200);
  },
});
</script>

<style scoped>
.panels{
  margin: 20px auto;
  width: 400px;
}

.delete{
  position: absolute;
  left: 10px;
  cursor: pointer;
}

.search{
  position: absolute;
  left: 0;
  text-decoration:none;
  margin-left: 10px;
}
</style>
