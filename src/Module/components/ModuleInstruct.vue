<template>
<!--  TODO: make the inputs into actual components -->
  <v-container class="module-instruct">
    <div class="module-instruct__container">
      <div v-if="$apollo.loading">Loading...</div>
      <div v-if="instruct">
      <h3 class="mb-3">Instructions</h3>
      <v-textarea
          solo auto-grow
          color="black"
          flat
          outlined
          :disabled = readonly
          rows="4"
          name="input-7-4"
          v-model="instruct.instruction"
        ></v-textarea>
        <div v-for="(step,i) in instruct.steps" :key="i">
        <v-responsive
        v-if="!readonly"
      class="order text-center grey lighten-2 rounded-circle
      d-inline-flex align-center justify-left mb-3"
      height="40"
      width="40"
    >
      {{ step.rank }}
    </v-responsive>
        <v-textarea
          color="black"
          class="text"
          solo auto-grow
          :disabled = readonly
          flat
          outlined
          name="input-7-4"
          v-model="step.name"
          rows="1"
        ></v-textarea>
        </div>
        <v-btn @click="addInstruct" v-if="!readonly"
        depressed outlined width="425px"><v-icon>add</v-icon></v-btn>
        <v-flex v-if="!readonly" style="margin-top: 120px; text-align:center">
        <span><v-btn depressed outlined height="40px" width="200px"
        @click="save()"><h3>Save</h3></v-btn></span>
        </v-flex>
    </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { instructQuery, instructMutation } from '@/graphql/graphql';
import gql from 'graphql-tag';

export default Vue.extend({
  name: 'ModuleInstruct',
  props: {
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  apollo: {
    instruct: instructQuery,
  },
  data: () => ({
    instruct: { instruction: '', number: 0, steps: [{ name: '', rank: 0 }] },
  }),
  methods: {
    addInstruct() {
      this.instruct.number += 1;
      const newInstruct = { name: '', rank: this.instruct.number };
      this.instruct.steps.push(newInstruct);
    },
    async save() {
      // Call to the graphql mutation
      await this.$apollo.mutate({
      // Query
        mutation: instructMutation,
        // Parameters
        variables: {
          instruction: this.instruct.instruction,
          steps: this.instruct.steps,
          number: this.instruct.number,
        },
        update: (store, { data: { updateOneInstruct } }) => {
          const data: any = store.readQuery({
            query: instructQuery,
          });
          data.instruct = updateOneInstruct;
          store.writeQuery({
            query: instructQuery,
            data,
          });
        },
      });
    },
  },
});
</script>
<style scoped>
  .order{
    position: absolute;
    left: 29%;
  }
  v-textarea{
    position: relative;
  }
</style>
