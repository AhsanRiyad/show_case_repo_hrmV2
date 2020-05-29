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
  name: "careerDetails",
  components: {},
  props: ["age"],
  mixins: [commonMixins],
  data: () => ({
    apiBase: "/em/careerDetail/",
    componentName: "Career Detail",
    tableHeader: [
      {
        text: "Department Name",
        align: "start",
        sortable: false,
        value: "departmentName"
      },
      { text: "Emloyement Type", value: "employeeTypeId" },
      {
        text: "Designation",
        value: "designation"
      },
      { text: "Job Location", value: "jobLocation" },
      { text: "Name Of Supervisor", value: "nameOfSupervisor" },
      { text: "Major Responsibilities", value: "majorResponsibilites" },
      { text: "Key Achievements", value: "keyAchievement" },
      { text: "total Experience Year", value: "totalExperience" },
      { text: "Career Start Date", value: "startDate" },
      { text: "Career End Date", value: "endDate" },
      { text: "Actions", value: "actions" }
    ],
    formArray: [
      {
        type: "cAutoComplete",
        label: "Work Area*",
        name: "careerDetailWorkAreaId",
        api: "/ws/companyClassType/getAll/active?page=0&pageSize=50",
        required: true,
        value: ""
      },
      {
        type: "cTextField",
        label: "Organization Name*",
        name: "organizationName",
        value: "",
        required: true
      },
      {
        type: "cTextArea",
        label: "Organization Adress*",
        name: "organizationAddress",
        value: "",
        required: true
      },
      {
        type: "cAutoComplete",
        label: "Organization Type*",
        name: "organizationTypeId",
        api: "/ws/companyClassType/getAll/active?page=0&pageSize=50",
        required: true,
        value: ""
      },
      {
        type: "cTextField",
        label: "Organization Name*",
        name: "organizationName",
        value: "",
        required: true
      },
      {
        type: "cAutoComplete",
        label: "Organization Type*",
        name: "eduInstitutionId",
        api: "/ws/companyClassType/getAll/active?page=0&pageSize=50",
        required: true,
        value: ""
      },
      {
        type: "cTextField",
        label: "Department Name*",
        name: "departmentName",
        value: "",
        required: true
      },
      {
        type: "cAutoComplete",
        label: "Employement Type*",
        name: "employeeTypeId",
        api: "/ws/companyClassType/getAll/active?page=0&pageSize=50",
        required: true,
        value: ""
      },
      {
        type: "cTextField",
        label: "Designation*",
        name: "designation",
        value: "",
        required: true
      },
      {
        type: "cTextField",
        label: "Job Location*",
        name: "jobLocation",
        value: "",
        required: true
      },
      {
        type: "cTextField",
        label: "Name Of Supervisor*",
        name: "nameOfSupervisor",
        value: "",
        required: true
      },
      {
        type: "cTextField",
        label: "Supervisor Contact Number*",
        name: "supervisorContactNumber",
        value: "",
        required: true
      },
      {
        type: "cTextField",
        label: "Supervisor Email*",
        name: "supervisorEmail",
        value: "",
        required: true
      },
      {
        type: "cTextArea",
        label: "Major Responsibility*",
        name: "majorResponsibilites",
        value: "",
        required: true
      },
      {
        type: "cTextArea",
        label: "Key Achievement*",
        name: "keyAchievement",
        value: "",
        required: true
      },
      {
        type: "cCheckBox",
        label: "Til Today?",
        name: "tillToday",
        value: false
      },
      {
        type: "cDatePicker",
        value: "",
        label: "Career Start Date",
        name: "startDate",
        required: true
      },
      {
        type: "cDatePicker",
        value: "",
        label: "Career End Date",
        name: "endDate",
        required: false
      },
      {
        type: "cTextField",
        label: "Supervisor Email*",
        name: "supervisorEmail",
        value: "",
        required: true
      }
    ]
  }),
  computed: {},
  watch: {},
  created() {}
};
</script>
<style scoped></style>
