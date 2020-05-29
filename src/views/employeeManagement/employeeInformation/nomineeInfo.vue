<template>
  <span>
    <baseTable :apiBase="apiBase" v-bind="$attrs" :tableHeader="tableHeader" :formArray="formArray">
      <template v-slot:formBaseTable=" age2 ">
        <allFormInputs :age2="age2" :formArray.sync="formArray"></allFormInputs>
      </template>
    </baseTable>
  </span>
</template>
<script>
import commonMixins from "@/mixins/commonMixins";
export default {
  name: "nomineeInfo",
  components: {},
  props: ["age"],
  mixins: [commonMixins],
  data: () => ({
    apiBase: "/em/nominee/",
    tableHeader: [
      {
        text: "Nominee Name",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "Nominee Type", value: "nomineeType" },
      {
        text: "Relationship",
        value: "relationship"
      },
      { text: "Percentage", value: "nomineePercentage" },
      { text: "Date Of Birth", value: "dateOfBirth" },
      { text: "Actions", value: "actions" }
    ],
    formArray: [
      {
        type: "cTextField",
        label: "Nominee Name*",
        name: "name",
        value: "",
        required: true
      },
      {
        type: "cAutoComplete",
        label: "Nominee Type*",
        name: "nomineeType",
        api: "/ws/companyClassType/getAll/active?page=0&pageSize=50",
        required: true,
        value: ""
      },
      {
        type: "cTextField",
        label: "Email*",
        name: "email",
        value: "",
        required: true
      },
      {
        type: "cTextField",
        label: "Contact Number*",
        name: "contactPhoneNo",
        value: "",
        required: true
      },
      {
        type: "cCheckBox",
        label: "Is CBL Employees",
        name: "cblEmployee",
        value: false
      },
      {
        type: "cCheckBox",
        label: "Eligible for Health Insurance",
        name: "isEligible",
        value: false
      },
      {
        type: "cTextField",
        label: "Profession*",
        name: "profession",
        value: "",
        required: true
      },
      {
        type: "cDatePicker",
        value: "",
        label: "Date Of Birth",
        name: "dateOfBirth",
        required: false
      }
    ]
  }),
  computed: {},
  watch: {},
  created() {}
};
</script>
<style scoped></style>
