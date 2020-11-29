<template>
<v-container style="position:relative" class="module-edit">
  <div class="module-edit__container">
    <div v-if="$apollo.loading" class="loadingClass">Loading...</div>
    <div v-if="previews && allTeam">
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
  <ModuleEditTableData :show="show" :headers="headers"
  :researchData="researchData" :selectedName="selectedName"
  v-if="!show" readonly/>
      </div>
      </div>
</v-container>
</template>

<script lang="ts">
import Vue from 'vue';
// import gql from 'graphql-tag';
import gql from 'graphql-tag';
import { previewsData, queryAllTeam } from '@/graphql/graphql';
import ModuleEditTableData from './ModuleEditTableData.vue';

export default Vue.extend({
  name: 'ModuleEdit',
  components: {
    ModuleEditTableData,
  },
  apollo: {
    previews: {
      query: previewsData,
      pollInterval: 5000,
    },
    allTeam: {
      query: queryAllTeam,
      pollInterval: 5000,
    },
  },
  data: () => ({
    previews: [],
    allTeam: [],
    selectedName: '',
    show: true,
    dialog: false,
    researchData: {},
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
  }),
  methods: {
    selectedItem(name: string) {
      this.selectedName = name;
      const i = this.previews.findIndex((x: {teamName: string}) => x.teamName === name);
      this.researchData = this.previews[i];
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
