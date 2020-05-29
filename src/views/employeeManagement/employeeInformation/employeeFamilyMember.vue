<template>
  <span>
    <baseTable :componentName="componentName" :apiBase="apiBase" v-bind="$attrs" :tableHeader="tableHeader" :formArray="formArray">
      <template v-slot:formBaseTable=" age2 ">
        <allFormInputs :age2="age2" :formArray.sync="formArray"></allFormInputs>
      </template>
    </baseTable>
  </span>
</template>
<script>
import commonMixins from "@/mixins/commonMixins";

export default {
  name: "familyMemberInfo",
  components: {},
  props: ["age"],
  mixins: [commonMixins],
  data: () => ({
    apiBase: "/em/familyMember/",
    componentName: 'Family Member',
    tableHeader: [
      {
        text: "Family Member Name",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "Relationship Type", value: "familyRelationTypeId" },
      {
        text: "Company Classification Type Name",
        value: "companyClassTypeName"
      },
      { text: "Contact No", value: "contactPhoneNo" },
      { text: "Actions", value: "actions" }
    ],
    formArray: [
      {
        type: "cTextField",
        label: "Family Member Name*",
        name: "name",
        value: "",
        required: true
      },
      {
        type: "cAutoComplete",
        label: "Relationship Type*",
        name: "companyClassTypeId",
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
