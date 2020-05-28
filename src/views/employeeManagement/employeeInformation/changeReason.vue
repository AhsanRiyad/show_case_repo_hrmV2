<template>
  <span>
    <v-subheader>
      Reason
      <v-divider inset></v-divider>
    </v-subheader>
    <v-card class="ml-2 mr-2">
      <allFormInputs :formArray.sync="formArray"></allFormInputs>
    </v-card>
  </span>
</template>

<script>
import commonMixins from "@/mixins/commonMixins";
export default {
  name: "changeReason",
  components: {},
  props: ["age"],
  mixins: [commonMixins],
  data: () => ({
    formArray: [
      {
        type: "cAutoComplete",
        label: "Change Reason*",
        name: "changeReasonId",
        api: "/em/changeReason/getAll/active?page=0&pageSize=50",
        required: true,
        value: ""
      },
      {
        type: "cTextArea",
        label: "Remarks*",
        name: "remarks",
        value: "",
        required: true
      },
    ]
  }),
  computed: {},
  methods: {},
  watch: {},
  created() {}
};
</script>
<style scoped></style>
