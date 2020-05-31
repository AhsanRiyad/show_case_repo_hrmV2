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
  name: "nomineeInfo",
  components: {},
  props: ["age"],
  mixins: [commonMixins],
  data: (vm) => ({
    apiBase: "/em/nominee/",
    componentName: "Nominee",
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
        value: "familyRelationTypeName"
      },
      { text: "Percentage", value: "nomineePercentage" },
      { text: "Date Of Birth", value: "dateOfBirth" },
      { text: "Actions", value: "actions" }
    ],
    formArray: [
      {
        type: "cAutoComplete",
        label: "Family Member*",
        name: "familyMemberId",
        api: "/em/familyMember/getAll/active/dropdown",
        required: true,
        value: "",
        changeEvent: vm.updateDependentFieldForNominee,
        dependentFieldName: "familyRelationTypeId",
        dependentApi: "/em/familyMember/getActive/"
      },
      {
        type: "cAutoComplete",
        label: "Nominee Type*",
        name: "nomineeType",
        items: [
          { id: "PF", name: "PF" },
          { id: "GF", name: "GF" },
          { id: "Insurance", name: "Insurance" },
          { id: "Final Settlement", name: "Final Settlement" }
        ],
        required: true,
        value: ""
      },
      {
        type: "cAutoComplete",
        label: "Relationship*",
        name: "familyRelationTypeName",
        items: [
          { id: "Father", name: "Father" },
          { id: "Mother", name: "Mother" },
          { id: "Sister", name: "Sister" },
          { id: "Brother", name: "Brother" },
          { id: "Child", name: "Child" },
          { id: "Relatives", name: "Relatives" }
        ],
        required: true,
        value: ""
      },
      {
        type: "cDatePicker",
        value: "",
        label: "Date Of Birth",
        name: "dateOfBirth",
        required: false
      },
      {
        type: "cTextField",
        label: "Nominee Percentage*",
        name: "nomineePercentage",
        value: "",
        required: true
      },
      {
        type: "cDatePicker",
        value: "",
        label: "Effective From",
        name: "startDate",
        required: false
      },
      {
        type: "cDatePicker",
        value: "",
        label: "Effective To",
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
