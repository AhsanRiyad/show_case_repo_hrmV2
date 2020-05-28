<template>
  <span>
    <baseTable
      :apiBase="apiBase"
      v-bind="$attrs"
      :tableHeader="tableHeader"
      :formArray="formArray"
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
    apiBase: "/ws/officeType/",
    tableHeader: [
      {
        text: "Office Type Name",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "Office Type Description", value: "description" },
      { text: "Is Branch", value: "sol" },
      { text: "Start Date", value: "startDate" },
      { text: "End Date", value: "endDate" },
      { text: "Actions", value: "actions" }
    ],
    formArray: [
      {
        type: "cTextField",
        label: "Office Type Name*",
        name: "name",
        value: "",
        required: true,
      },
      {
        type: "cTextArea",
        label: "Office Type Description*",
        name: "description",
        value: "",
        required: true,
      },
      {
        type: "cCheckBox",
        label: "Is Branch*",
        name: "sol",
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
