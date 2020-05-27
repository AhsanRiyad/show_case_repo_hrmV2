<template>
  <span>
    <v-subheader>
      Reason
      <v-divider inset></v-divider>
    </v-subheader>
    <v-card class="ml-2 mr-2">
      <allFormInputs :formArray.sync="reason"></allFormInputs>
    </v-card>
  </span>
</template>

<script>
import commonMixins from "@/mixins/commonMixins";
export default {
  name: "reason",
  components: {},
  props: ["age"],
  mixins: [commonMixins],
  data: () => ({
    reason: [
      {
        type: "cTextArea",
        label: "Remarks*",
        name: "officeAddress",
        value: "",
        required: true
      }
    ]
  }),
  computed: {},
  methods: {},
  watch: {},
  created() {}
};
</script>
<style scoped></style>
