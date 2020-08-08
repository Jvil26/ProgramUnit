<template>
  <v-container class="module-outcomes">
    <div class="module-outcomes__container">
    <v-toolbar
      flat
      dense
    >
      <v-toolbar-title>
        <span class="subheading" style="text-align:center">Minimum Questions
        needed to Unlock Resources</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-card-text>
      <v-row
        class="mb-4"
        justify="space-between"
      >
        <v-col class="text-left">
          <span
            class="display-3 font-weight-light"
            style="margin-left:37%"
            v-text="link.numQuestions"
          ></span>
          <span class="subheader ml-3">Question(s)</span>
        </v-col>
      </v-row>
    </v-card-text>
      <div style="max-width: 480px; margin-left: 3%;">
      <v-slider
        color="black"
        v-model="link.numQuestions"
        track-color="grey"
        always-dirty
        min="0"
        max="6"
      >

        <template v-slot:prepend>
          <v-icon
            @click="Qdecrement()"
          >
            mdi-minus
          </v-icon>
        </template>

        <template v-slot:append>
          <v-icon
            @click="Qincrement()"
          >
            mdi-plus
          </v-icon>
        </template>
      </v-slider>
      </div>
      <div style="margin-top: 10%;">
    <v-toolbar
      flat
      dense
    >
      <v-toolbar-title style="margin-left: 25%;">
        <span class="subheading">Minimum Links
        Required</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-card-text>
      <v-row
        class="mb-4"
        justify="space-between"
      >
        <v-col class="text-left">
          <span
            class="display-3 font-weight-light"
            style="margin-left:37%"
            v-text="link.numLinks"
          ></span>
          <span class="subheader ml-3">Link(s)</span>
        </v-col>
      </v-row>

      <v-slider
        color="black"
        v-model="link.numLinks"
        track-color="grey"
        always-dirty
        min="0"
        max="6"
      >
        <template v-slot:prepend>
          <v-icon
            @click="Ldecrement()"
          >
            mdi-minus
          </v-icon>
        </template>

        <template v-slot:append>
          <v-icon
            @click="Lincrement()"
          >
            mdi-plus
          </v-icon>
        </template>
      </v-slider>
    </v-card-text>
    </div>
    <v-flex style="margin-top: 100px; text-align:center">
        <v-btn depressed outlined height="40px"
        width="200px" class="mr-6" @click="discard()"><h3>Discard</h3></v-btn>
        <span><v-btn depressed outlined height="40px" width="200px"
        @click="save()"><h3>Save</h3></v-btn></span>
        </v-flex>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import gql from 'graphql-tag';
// import gql from 'graphql-tag';

export default Vue.extend({
  name: 'ModuleOutcomes',
  apollo: {
    link: gql`
    query {
      link {
        numLinks
        numQuestions
        currentQ
        currentL
      }
    }`,
  },
  data: () => ({
    questions: 0,
    links: 0,
    interval: null,
  }),
  methods: {
    async save() {
      // Call to the graphql mutation
      await this.$apollo.mutate({
      // Query
        mutation: gql`mutation ($numQuestions: Int!, $numLinks: Int!) {
        updateOneLink(set: { numQuestions: $numQuestions, numLinks: $numLinks, currentQ: $numQuestions, currentL: $numLinks, }) {
          numQuestions
          numLinks
          currentL
          currentQ
        }
      }`,
        // Parameters
        variables: {
          numQuestions: this.link.numQuestions,
          numLinks: this.link.numLinks,
        },
      });
    },
    discard() {
      this.link.numQuestions = this.link.currentQ;
      this.link.numLinks = this.link.currentL;
    },
    Qdecrement() {
      this.link.numQuestions -= 1;
    },
    Qincrement() {
      this.link.numQuestions += 1;
    },
    Ldecrement() {
      this.link.numLinks -= 1;
    },
    Lincrement() {
      this.link.numLinks += 1;
    },
  },
});
</script>

<style scoped>
  .subheading{
    font-weight: bold;
  }
  .subheader{
    text-align:center;
    font-size: 20px;
    font-weight: lighter;
  }
  v-slider{
    width: 100px;
  }
</style>
