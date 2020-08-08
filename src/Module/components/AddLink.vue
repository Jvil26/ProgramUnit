<template>
    <h1>hello</h1>
</template>
<script lang="ts">
import Vue from 'vue';
// import gql from 'graphql-tag';
import gql from 'graphql-tag';

export default Vue.extend({
  name: 'AddLink',
  props: ['name', 'questions'],
  apollo: {
  },
  data: () => ({
    body: null,
    feedback: null,
  }),
  methods: {
    async addLink() {
      if (this.body) {
        console.log(this.name);
        console.log(this.body);
        console.log(this.questions);
        this.questions.links.push(this.body);
        await this.$apollo.mutate({
          // Query
          mutation: gql`mutation ($questions: [PreviewQuestionUpdateInput], $links: [String]) {
          updateOnePreview(set: { links: $links }) {
            question{
              links
            }
          }
        }`,
          // Parameters
          variables: {
            links: this.questions.links,
            questions: this.questions,
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
