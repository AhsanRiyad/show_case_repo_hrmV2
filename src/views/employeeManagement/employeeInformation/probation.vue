<template>
  <span>
    <baseTable
      :componentName="componentName"
      :apiBase="apiBase"
      v-bind="$attrs"
      :tableHeader="tableHeader"
      :formArray="formArray"
    >
      <template v-slot:formBaseTable=" age2 ">
        <allFormInputs :age2="age2" :formArray.sync="formArray"></allFormInputs>
      </template>
    </baseTable>
  </span>
</template>
<script>
import commonMixins from "@/mixins/commonMixins";
export default {
  name: "probation",
  components: {},
  props: ["age"],
  mixins: [commonMixins],
  data: () => ({
    apiBase: "/em/probation/",
    componentName: "Probation",
    tableHeader: [
      {
        text: "Employee Id",
        align: "start",
        sortable: false,
        value: "employeeId"
      },
      { text: "Employee Name", value: "employeeName" },
      { text: "Duration", value: "duration" },
      { text: "Effective Start Date", value: "startDate" },
      { text: "Effective End Date", value: "endDate" },
      { text: "Actions", value: "actions" }
    ],
    formArray: [
      {
        type: "cTextField",
        label: "Duration (Months)*",
        name: "duration",
        value: "",
        required: true
      },
      {
        type: "cDatePicker",
        value: "",
        label: "Effective Start Date",
        name: "startDate",
        required: true
      },
      {
        type: "cDatePicker",
        value: "",
        label: "Effective End Date",
        name: "endDate",
        required: false
      },
    ]
  }),
  computed: {},
  watch: {},
  created() {}
};
</script>
<style scoped></style>
