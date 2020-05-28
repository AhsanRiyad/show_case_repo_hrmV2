<template>
  <span>
    <v-subheader>
      Signature
      <v-divider inset></v-divider>
    </v-subheader>
    <v-card class="ml-2 mr-2">
      <v-col cols="5">
        <v-img src="https://picsum.photos/510/300?random" aspect-ratio="1.7"></v-img>

        <v-file-input class="mt-3" show-size accept="image/*" label="File input"></v-file-input>

        <v-btn flat class="red darken-1 white--text mt-3">Update</v-btn>
      </v-col>
    </v-card>
  </span>
</template>


<script>
import commonMixins from "@/mixins/commonMixins";
export default {
  name: "employeeSignature",
  mixins: [commonMixins],
  data: () => ({}),
  methods: {},
  created() {}
};
</script>
<style scoped></style>
