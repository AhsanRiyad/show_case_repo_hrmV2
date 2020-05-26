<template>
  <span>
    <v-form ref="form">
      <v-subheader>
        Bank Account Assignment
        <v-divider inset></v-divider>
      </v-subheader>
      <v-card class="ml-2 mr-2">
        <allFormInputs :formArray.sync="effectiveDate"></allFormInputs>
      </v-card>
    
    </v-form>
  </span>
</template>
<script>
import commonMixins from "@/mixins/commonMixins";

export default {
  name: "bankAccountAssignment",
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
  methods: {
    closeDialog(){
      console.log(this.$parent.$children);
    },
    submit() {}
  },
  watch: {},
  created() {}
};
</script>
<style scoped></style>
