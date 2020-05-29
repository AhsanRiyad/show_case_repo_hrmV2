<template>
  <span>
    <baseTable
      :tableHeader="tableHeader"
      :formArray="formArray"
      :apiBase="apiBase"
      :componentName="componentName"
    >
      <template v-slot:formBaseTable=" age2 ">
        <allFormInputs  :age2="age2" :formArray.sync="formArray"></allFormInputs>
      </template>
    </baseTable>
  </span>
</template>
<script>
import commonMixins from "../../mixins/commonMixins";
export default {
  name: "grade",
  components: {},
  props: ["age"],
  mixins: [commonMixins],
  data: () => ({
    apiBase: "/ws/grade/",
    componentName: 'Grade',
    tableHeader: [
      {
        text: "Grade Name",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "Grade Description", value: "description" },
      { text: "Start Date", value: "startDate" },
      { text: "End Date", value: "endDate" },
      { text: "Actions", value: "actions" }
    ],
    formArray: [
      {
        type: "cTextField",
        label: "Grade Name*",
        name: "name",
        value: "Name",
        required: true,
      },
      {
        type: "cTextArea",
        label: "Grade Description*",
        name: "description",
        value: "Name",
        required: true,
      },
      {
        type: "cDatePicker",
        value: "",
        label: "Start Date*",
        name: "startDate",
        required: true,
        max: "endDate"
      },
      {
        type: "cDatePicker",
        value: "",
        label: "End Date",
        name: "endDate",
        required: false,
        min: "startDate"
      }
      
    ]
  }),
  computed: {},
  watch: {},
  created() {}
};
</script>
<style scoped></style>
