<template>
  <span>
    <v-subheader>
      Effective Date
      <v-divider inset></v-divider>
    </v-subheader>
    <v-card class="ml-2 mr-2">
      <allFormInputs :formArray.sync="effectiveDate"></allFormInputs>
    </v-card>
  </span>
</template>


<script>
import commonMixins from "@/mixins/commonMixins";
export default {
  name: "effectiveDate",
  components: {},
  props: ["age"],
  mixins: [commonMixins],
  data: () => ({
    effectiveDate: [
      {
        type: "cDatePicker",
        value: "",
        label: "Effective Start Date",
        name: "startDate",
        required: false
      },
      {
        type: "cDatePicker",
        value: "",
        label: "Effective End Date",
        name: "endDate",
        required: false
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
