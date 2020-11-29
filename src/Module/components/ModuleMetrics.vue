<template>
  <v-container class="module-metrics">
    <div class="module-metrics__container">
      <div v-if="$apollo.loading">Loading...</div>
      <div v-if="allTeam">
      <h2 style="text-align:center; margin-bottom: 30px">Total Students: {{ totalStudents }}</h2>
      <v-layout row wrap style="text-align:center">
        <v-flex xs6>
          <h3 style="text-decoration: underline;">Average Questions Per Team</h3>
        </v-flex>
        <v-flex xs6>
          <h3 style="text-decoration: underline;">Average Links Per Team</h3>
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
      <iframe style="
      background: #FFFFFF;
      border: none;
      margin-top: 20px;
      "
      width="640"
      height="480"
      id="myFrame"
      :src="chartURL">
      </iframe>
      <div class="text-center">
      <v-btn style="margin-bottom: 20px" @click="showQuestionFilter = !showQuestionFilter,
      refresh()">
        {{ filterText }}</v-btn>
      <v-pagination
        v-model="currentPage"
        :length="charts.length"
        color = "grey"
        @input="ShowChart()"
      ></v-pagination>
  </div>
    </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { queryAllTeam } from '@/graphql/graphql';
import gql from 'graphql-tag';

export default Vue.extend({
  name: 'ModuleMetrics',
  apollo: {
    allTeam: {
      query: queryAllTeam,
    },
  },
  data: () => ({
    filterText: 'Filter by Links',
    showQuestionFilter: true,
    currentPage: 1,
    chartURL: 'https://charts.mongodb.com/charts-project-0-shjuo/embed/charts?id=ef83421d-7c7f-4a4c-97c9-92ae6d72a4b1&autoRefresh=60&theme=light',
    charts: [
      { PageNumber: 1, sortByQuestions: 'https://charts.mongodb.com/charts-project-0-shjuo/embed/charts?id=ef83421d-7c7f-4a4c-97c9-92ae6d72a4b1&autoRefresh=60&theme=light', sortByLinks: 'https://charts.mongodb.com/charts-project-0-shjuo/embed/charts?id=64f55c88-c21e-4571-9a6b-4e5ee1237eb0&autoRefresh=60&theme=light' },
      { PageNumber: 2, sortByQuestions: 'https://charts.mongodb.com/charts-project-0-shjuo/embed/charts?id=daa1765f-6713-4d79-85a3-25e0d11766c4&autoRefresh=60&theme=light', sortByLinks: 'https://charts.mongodb.com/charts-project-0-shjuo/embed/charts?id=4b06b4c9-32a3-4384-b470-33b5470a710e&autoRefresh=60&theme=light' },
      { PageNumber: 3, sortByQuestions: 'https://charts.mongodb.com/charts-project-0-shjuo/embed/charts?id=89457fe1-5af3-4595-b85a-3d5287f196cc&autoRefresh=60&theme=light', sortByLinks: 'https://charts.mongodb.com/charts-project-0-shjuo/embed/charts?id=ec6f7b1b-71d9-4fc1-a3c6-c5e0e054e9a8&autoRefresh=60&theme=light' },
      { PageNumber: 4, sortByQuestions: 'https://charts.mongodb.com/charts-project-0-shjuo/embed/charts?id=174dd733-ccda-4377-91f0-78869b91afb5&autoRefresh=60&theme=light', sortByLinks: 'https://charts.mongodb.com/charts-project-0-shjuo/embed/charts?id=effc9596-87b6-4536-93e7-3ce4bb4df66c&autoRefresh=60&theme=light' },
      { PageNumber: 5, sortByQuestions: 'https://charts.mongodb.com/charts-project-0-shjuo/embed/charts?id=bc20268e-2ffe-4592-a6d1-01fb70d445b7&autoRefresh=60&theme=light', sortByLinks: 'https://charts.mongodb.com/charts-project-0-shjuo/embed/charts?id=1c479127-7898-4852-998a-83199cf99c30&autoRefresh=60&theme=light' },
      { PageNumber: 6, sortByQuestions: 'https://charts.mongodb.com/charts-project-0-shjuo/embed/charts?id=9c6f85a6-c58f-4b6e-b183-fbfa8a9d33ac&autoRefresh=60&theme=light', sortByLinks: 'https://charts.mongodb.com/charts-project-0-shjuo/embed/charts?id=b754fb90-75cb-47d1-a0a5-f300c6e13e06&autoRefresh=60&theme=light' },
      { PageNumber: 7, sortByQuestions: 'https://charts.mongodb.com/charts-project-0-shjuo/embed/charts?id=1b45afd3-0856-490b-8ac8-bb50537f3281&autoRefresh=60&theme=light', sortByLinks: 'https://charts.mongodb.com/charts-project-0-shjuo/embed/charts?id=f5e689f5-9dc5-4735-8385-96950518b731&autoRefresh=60&theme=light' },
      { PageNumber: 8, sortByQuestions: 'https://charts.mongodb.com/charts-project-0-shjuo/embed/charts?id=d34cd0d9-65a2-4b63-bd2c-a1f5276be813&autoRefresh=60&theme=light', sortByLinks: 'https://charts.mongodb.com/charts-project-0-shjuo/embed/charts?id=95c53577-75da-4282-a7f4-212d88185d39&autoRefresh=60&theme=light' },
      { PageNumber: 9, sortByQuestions: 'https://charts.mongodb.com/charts-project-0-shjuo/embed/charts?id=09bc7fff-75b0-4b2c-a891-5d2f06b93589&autoRefresh=60&theme=light', sortByLinks: 'https://charts.mongodb.com/charts-project-0-shjuo/embed/charts?id=07b621ae-4f08-44ec-a901-b03130e07070&autoRefresh=60&theme=light' },
      { PageNumber: 10, sortByQuestions: 'https://charts.mongodb.com/charts-project-0-shjuo/embed/charts?id=324d1a4f-e19e-4cca-a720-35c60ff64cad&autoRefresh=60&theme=light', sortByLinks: 'https://charts.mongodb.com/charts-project-0-shjuo/embed/charts?id=a41a9879-470a-4907-9881-0f4992dbebd7&autoRefresh=60&theme=light' },
    ],
    datacollection: null,
    totalStudents: '84',
    avgQ: 0,
    avgL: 0,
  }),
  methods: {
    refresh() {
      const iframe: any = document.getElementById('myFrame');
      if (this.showQuestionFilter) {
        iframe.src = this.charts[this.currentPage - 1].sortByQuestions;
        this.filterText = 'Filter by Links';
      } else {
        iframe.src = this.charts[this.currentPage - 1].sortByLinks;
        this.filterText = 'Filter by Questions';
      }
    },
    ShowChart() {
      if (this.showQuestionFilter) {
        this.chartURL = this.charts[this.currentPage - 1].sortByQuestions;
      } else {
        this.chartURL = this.charts[this.currentPage - 1].sortByLinks;
      }
    },
    async updateData() {
      const result = await this.$apollo.query({
        query: queryAllTeam,
      });
      this.avgQ = 0;
      this.avgL = 0;
      Object.keys(result.data.allTeam.team).forEach((key) => {
        // avg = total/number of students
        this.avgQ += result.data.allTeam.team[key].totalQ;
        this.avgL += result.data.allTeam.team[key].totalL;
      });
      this.avgQ /= result.data.allTeam.team.length;
      this.avgL /= result.data.allTeam.team.length;
      this.avgQ = Math.round(this.avgQ * 10) / 10;
      this.avgL = Math.round(this.avgL * 10) / 10;
    },
  },
  async mounted() {
    const result = await this.$apollo.query({
      query: queryAllTeam,
    });
    Object.keys(result.data.allTeam.team).forEach((key) => {
      // avg = total/number of students
      this.avgQ += result.data.allTeam.team[key].totalQ;
      this.avgL += result.data.allTeam.team[key].totalL;
    });
    this.avgQ /= result.data.allTeam.team.length;
    this.avgL /= result.data.allTeam.team.length;
    this.avgQ = Math.round(this.avgQ * 10) / 10;
    this.avgL = Math.round(this.avgL * 10) / 10;
    window.setInterval(async () => {
      this.updateData();
    }, 60000);
  },
});
</script>
