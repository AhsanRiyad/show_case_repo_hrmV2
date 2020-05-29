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
  name: "businessGroup",
  components: {},
  props: ["age"],
  mixins: [commonMixins],
  data: () => ({
    apiBase: "/ws/designation/",
    componentName: 'Designation' ,
    tableHeader: [
      {
        text: "Designation Name",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "Start Date", value: "startDate" },
      { text: "End Date", value: "endDate" },
      { text: "Actions", value: "actions" }
    ],
    formArray: [
      {
        type: "cTextField",
        label: "Description Name*",
        name: "name",
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
