<template>
<v-container style="position:relative" class="module-edit">
  <div class="module-edit__container">
    <v-data-table
        v-if="show"
        style="margin-top: 50px"
        :headers="teamHeaders"
        :items="allTeam.team"
        :items-per-page="5"
        class="elevation-1">
          <template #item="team" v-if="show">
          <tr style="cursor:pointer" @click="show = false;
          selectedItem(team.item.name)">
        <td style="text-transform: capitalize">{{ team.item.name }}</td>
        <td style="text-align:center">{{ team.item.totalQ }}</td>
        <td style="text-align:center">{{ team.item.totalL }}</td>
        </tr>
    </template>
        </v-data-table>
    <v-icon v-if="!show" @click="show = true" large depressed class="back white-text"
        style="cursor: pointer">keyboard_backspace</v-icon>
  <QuestionLinkData :show="show" :headers="headers"
  :questions="questions" :selectedName="selectedName"
  :teams="teams" v-if="!show" readonly/>
      </div>
</v-container>
</template>

<script lang="ts">
import Vue from 'vue';
// import gql from 'graphql-tag';
import gql from 'graphql-tag';
import QuestionLinkData from './QuestionsLinksData.vue';

export default Vue.extend({
  name: 'ModuleEdit',
  components: {
    QuestionLinkData,
  },
  apollo: {
    allTeam: gql`
      query {
allTeam {
team {
name
totalL
totalQ
}
  }
  }`,
  },
  data: () => ({
    selectedName: null,
    show: true,
    dialog: false,
    teamHeaders: [
      {
        text: 'Team Name',
        align: 'start',
        sortable: true,
        value: 'name',
      },
      {
        text: 'Number of Questions',
        align: 'end',
        sortable: true,
        value: 'totalQ',
      },
      {
        text: 'Number of Links',
        align: 'end',
        sortable: true,
        value: 'totalL',
      },
    ],
    headers: [
      {
        text: 'Questions',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      {
        text: 'Links',
        value: 'links',
        align: 'center',
      },
    ],
    questions: [
      {
        teamName: 'team sushi',
        name: 'What is Alan AI?',
        links: ['https://alan.app/'],
      },
      {
        teamName: 'team sushi',
        name: 'What is Google?',
        links: ['https://www.google.com/'],
      },
      {
        teamName: 'team pizza',
        name: 'How do I learn to code?',
        links: ['https://alan.app/',
          '\nhttps://vuetifyjs.com/en/components/data-tables/#data-tables'],
      },
    ],
  }),
  methods: {
    selectedItem(name) {
      this.selectedName = name;
    },
  },
});
</script>
<style scoped>
  .back{
    position: absolute;
    top: 0;
    left: 20px;
  }
  .headline{
    position: relative;
  }
  .close{
    position: absolute;
    right: 10px;
    top: 0;
    font-size: 30px;
  }
</style>
