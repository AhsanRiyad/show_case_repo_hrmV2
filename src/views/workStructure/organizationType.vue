<template>
  <span>
    <baseTable
      :tableHeader="tableHeader"
      :formArray="formArray"
      booleanValueInTheTable="costCenter"
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
    apiBase: "/ws/organizationType/",
    componentName: "Organization Type",
    tableHeader: [
      {
        text: "Organization Type Name",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "Organization Type Description", value: "description" },
      { text: "Is Cost Center", value: "costCenter" },
      { text: "Start Date", value: "startDate" },
      { text: "End Date", value: "endDate" },
      { text: "Actions", value: "actions" }
    ],
    formArray: [
      {
        type: "cTextField",
        label: "Organization Type Name*",
        name: "name",
        value: "Name",
        required: true,
      },
      {
        type: "cTextArea",
        label: "Organization Type Description*",
        name: "description",
        value: "",
        required: true,
      },
      {
        type: "cCheckBox",
        label: "Is Cost Center*",
        name: "costCenter",
        value: true,
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
