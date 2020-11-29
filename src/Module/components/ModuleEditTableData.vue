<template>
    <div>
      <v-card>
        <v-card-title>{{ selectedName }}</v-card-title>
    <v-data-table
        v-if="researchData"
        style="margin-top: 50px"
        :headers="headers"
        :items="researchData.questions"
        :items-per-page="5"
        class="elevation-1">
        <template v-slot:[`item.links`]="{ value }">
          <br>
         <a style="color:black;" v-for="(link, i) in value"
            :key="i" target="_blank" :href="value[i]">
              {{ value[i] }}
          <br>
          <br>
          </a>
        </template>
        </v-data-table>
        </v-card>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { previewsData } from '@/graphql/graphql';

export default Vue.extend({
  name: 'ModuleEditTableData',
  props: ['headers', 'researchData', 'selectedName'],
  apollo: {
  },
  data: () => ({
  }),
});
</script>
