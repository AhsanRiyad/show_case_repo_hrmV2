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
  name: "educationInfo",
  components: {},
  props: ["age"],
  mixins: [commonMixins],
  data: (vm) => ({
    apiBase: "/em/eduQualification/",
    componentName: "Education Info",
    tableHeader: [
      {
        text: "Qualification Title",
        align: "start",
        sortable: false,
        value: "qualificationTitle"
      },
      { text: "Major", value: "major" },
      {
        text: "Relationship",
        value: "relationship"
      },
      { text: "Passing Year", value: "passingYear" },
      { text: "CGPA/Percentage", value: "cgpaPercentage" },
      { text: "Institution Name", value: "eduInstitutionId" },
      { text: "Status", value: "status" },
      { text: "Start Date", value: "startDate" },
      { text: "End Date", value: "endDate" },
      { text: "Actions", value: "actions" }
    ],
    formArray: [
      {
        type: "cAutoComplete",
        label: "Qualification Type*",
        name: "qualificationId",
        api: "/em/qualificationType/getAll/active?page=0&pageSize=50",
        required: true,
        value: ""
      },
      {
        type: "cTextField",
        label: "Qualification Title*",
        name: "qualificationTitle",
        value: "",
        required: true
      },
      {
        type: "cAutoComplete",
        label: "Educational Institutions*",
        name: "eduInstitutionId",
        api: "/em/eduInstitution/getAll/active?page=0&pageSize=50",
        required: true,
        value: ""
      },
      {
        type: "cTextField",
        label: "Major*",
        name: "major",
        value: "",
        required: true
      },
      {
        type: "cTextField",
        label: "Passing Year*",
        name: "passingYear",
        value: "",
        required: true
      },
      {
        type: "cAutoComplete",
        label: "Educational Result Type*",
        name: "eduResultTypeId",
        api: "/em/eduResultType/getAll/active?page=0&pageSize=50",
        required: true,
        value: ""
      },
      {
        type: "cTextField",
        label: "CGPA Percentage*",
        name: "cgpaPercentage",
        value: "",
        required: true
      },
      {
        type: "cTextField",
        label: "CGPA Out Of*",
        name: "cgpaOutOf",
        value: "",
        required: true
      },
      {
        type: "cDatePicker",
        value: "",
        label: "Education Start Date",
        name: "startDate",
        required: true
      },
      {
        type: "cDatePicker",
        value: "",
        label: "Education End Date",
        name: "endDate",
        required: false
      },
      {
        type: "cFileInput",
        value: null,
        label: "SELECT SCAN COPY OF CIRTIFICATE",
        name: "file",
        showInput: true,
        rules: [v => !!v || false],
        multiple: false,
        accept: "image/*, .pdf",
        required: false,
        haveBtn: false,
        readonly: false,
        href:  vm.$store.state.apiBase +"/em/eduQualification/file/",
        btnLabel: 'Download Certificate',
      },
      
    ]
  }),
  computed: {},
  methods: {},
  watch: {},
  created() {}
};
</script>
<style scoped></style>
