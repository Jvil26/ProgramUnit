<template>
    <div>
    <v-img
        max-height="125px"
        max-width="125px"
        :src="mainModule.image"
        >
    </v-img>
    <v-file-input
        v-if="currentPage!=='Preview'"
        v-model="newImg"
        chips
        accept="image/*"
        hide-input
        @change="uploadImage"
        class="fileIcon"
    />
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { ModuleData, ImageMutation } from '@/graphql/graphql';

export default Vue.extend({
  name: 'UploadImg',
  props: ['currentPage'],
  apollo: {
    mainModule: {
      query: ModuleData,
    },
  },
  data: () => ({
    mainModule: { image: '' },
    newImg: new File([''], ''),
  }),
  methods: {
    uploadImage() {
      let img = this.newImg;
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = async (e: any) => {
        img = e.target.result;
        await this.$apollo.mutate({
          // Query
          mutation: ImageMutation,
          // Parameters
          variables: {
            image: img,
          },
          update: (store, { data: { updateOneMainModule } }) => {
            // Read the data from our cache for this query.
            const data: any = store.readQuery({
              query: ModuleData,
            });
            // Add our tag from the mutation to the end
            data.mainModule.image = updateOneMainModule.image;
            // Write our data back to the cache.
            store.writeQuery({
              query: ModuleData,
              data,
            });
          },
        });
      };
    },
  },
});
</script>
<style scoped>
  .fileIcon{
    position: absolute;
    left: 0;
    margin-left: 40px;
    top: 65%
  }
</style>
