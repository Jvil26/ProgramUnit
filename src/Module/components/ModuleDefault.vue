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
      <v-form style="text-align:center; margin-bottom: 70px;">
          <v-text-field
            style="width:500px;"
            outlined
            color="black"
            @keydown.enter.prevent="addQuestion" class="question" v-if="showInstructions"
             placeholder="What research question do you have?" v-model="another">
             </v-text-field>
             <p v-if="feedback" class="red--text mt-0">{{ feedback }}</p>
          </v-form>
          <div v-if="showInstructions">
          <v-expansion-panels
          class="panels" v-for="(question, i) in preview.questions" :key="i">
        <v-dialog v-model="dialog" persistent max-width="290">
          <template v-slot:activator="{ on, attrs }">
          <v-expansion-panel style="border: 1px solid black">
      <v-expansion-panel-header>
        <v-icon class="delete" align-center v-bind="attrs"
            v-on="on" @click="passData(question)">clear</v-icon>
        <h4 style="text-align:center; text-transform:capitalize">{{ question.name }}</h4>
      </v-expansion-panel-header>
      <v-expansion-panel-content style="margin-left: 20px">
        <div v-for="(link, k) in question.links" :key="k">
          <a class="search" target="_blank" :href="question.links[k]">
            <v-icon>forward</v-icon>
            </a>
          <p style="font-size:0.8em">{{ question.links[k] }}</p>
      </div>
        </v-expansion-panel-content>
          <v-expansion-panel-content>
    <v-form>
    <v-text-field
        @keydown.enter.prevent="addLink(i)"
        color="black"
        placeholder="Log research link here"
        v-model="body"
    ></v-text-field>
    <p v-if="feedback" style="text-align:center" class="red--text mt-0">{{ feedback }}</p>
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
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
// import gql from 'graphql-tag';
import gql from 'graphql-tag';
import AddLink from './AddLink.vue';
import Instruct from './ModuleInstruct.vue';

export default Vue.extend({
  name: 'ModuleDefault',
  components: {
    'module-instruct': Instruct,
  },
  apollo: {
    preview: {
      query: gql` query ($teamName: String!) {
  preview(query: { teamName: $teamName }){
    teamName
    totalL
    totalQ
    questions {
      name
      links
    }
}
  }`,
      // Parameters
      variables: {
        teamName: 'Team 7',
      },
    },
    allTeam: gql`
    query  {
  allTeam{
    team {
      name
      totalL
      totalQ
    }
  }
}`,
  },
  data: () => ({
    delete: '',
    showInstructions: true,
    dialog: false,
    obj: {},
    another: null,
    feedback: null,
    body: null,
  }),
  methods: {
    async addQuestion() {
      if (this.another) {
        const i = this.allTeam.team.findIndex((x) => x.name === this.preview.teamName);
        console.log(this.allTeam);
        this.obj.name = this.another;
        this.obj.links = [];
        this.preview.questions.push(this.obj);
        this.feedback = null;
        this.another = null;
        this.obj = {};
        this.allTeam.team[i].totalQ = this.preview.questions.length;
        await this.$apollo.mutate({
          // Query
          mutation: gql`mutation ($team: [AllTeamTeamUpdateInput], $questions: [PreviewQuestionUpdateInput], $totalQ: Int!, $teamName: String!) {
          updateOnePreview(query: {teamName: $teamName}, set: {questions: $questions, totalQ: $totalQ}){
            totalL
            totalQ
            questions {
              name
              links
            }
          }
          updateOneAllTeam(set: {team: $team}){
            team { 
              name
              totalQ
            }
          }
        }`,
          // Parameters
          variables: {
            teamName: this.preview.teamName,
            questions: this.preview.questions,
            totalQ: this.preview.questions.length,
            team: this.allTeam.team,
          },
        });
      } else {
        this.feedback = 'You must type a question first';
      }
    },
    passData(question) {
      console.log(question);
      this.delete = question.name;
    },
    async deleteQuestion() {
      const i = this.preview.questions.findIndex((x) => x.name === this.delete);
      const k = this.allTeam.team.findIndex((x) => x.name === this.preview.teamName);
      console.log(this.preview.questions[i].links.length);
      this.preview.totalL -= this.preview.questions[i].links.length;
      console.log(this.preview.totalL);
      this.preview.questions = this.preview.questions.filter((item) => item.name !== this.delete);
      this.allTeam.team[k].totalQ = this.preview.questions.length;
      this.allTeam.team[k].totalL = this.preview.totalL;
      await this.$apollo.mutate({
        // Query
        mutation: gql`mutation ($team: [AllTeamTeamUpdateInput], $questions: [PreviewQuestionUpdateInput], $totalL: Int!, $totalQ: Int!, $teamName: String!) {
          updateOnePreview(query: {teamName: $teamName}, set: {questions: $questions, totalL: $totalL, totalQ: $totalQ}){
            totalL
            totalQ
            questions {
              name
              links
            }
          }
          updateOneAllTeam(set: {team: $team}){
            team { 
              name
              totalQ
            }
          }
        }`,
        // Parameters
        variables: {
          teamName: this.preview.teamName,
          questions: this.preview.questions,
          totalL: this.preview.totalL,
          totalQ: this.preview.questions.length,
          team: this.allTeam.team,
        },
      });
    },
    async addLink(i) {
      if (this.body) {
        console.log(this.preview.totalL);
        const k = this.allTeam.team.findIndex((x) => x.name === this.preview.teamName);
        this.preview.totalL += 1;
        console.log(this.preview.totalL);
        this.preview.questions[i].links.push(this.body);
        this.allTeam.team[k].totalL = this.preview.totalL;
        await this.$apollo.mutate({
          // Query
          mutation: gql`mutation ($team: [AllTeamTeamUpdateInput], $questions: [PreviewQuestionUpdateInput], $totalL: Int!, $totalQ: Int!, $teamName: String!) {
          updateOnePreview(query: {teamName: $teamName}, set: {questions: $questions, totalL: $totalL, totalQ: $totalQ}){
            totalL
            totalQ
            questions {
              name
              links
            }
          }
           updateOneAllTeam(set: {team: $team}){
            team { 
              name
              totalQ
            }
          }
        }`,
          // Parameters
          variables: {
            teamName: this.preview.teamName,
            questions: this.preview.questions,
            totalL: this.preview.totalL,
            totalQ: this.preview.questions.length,
            team: this.allTeam.team,
          },
        });
        this.body = null;
      } else {
        this.feedback = 'You must enter a research link';
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
