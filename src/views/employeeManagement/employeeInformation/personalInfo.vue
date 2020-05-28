<template>
  <span>
    <v-subheader>
      Personal Information
      <v-divider inset></v-divider>
    </v-subheader>

    <!-- complexView for editEmployee, connected with baseTable, editEmployee.vue -->
    <v-card class="ml-2 mr-2" v-if="complexView !== undefined">
      <v-form ref="form">
        <allFormInputs :formArray.sync="formArray"></allFormInputs>
        <slot name="buttons" v-bind:reset="reset"></slot>
      </v-form>
    </v-card>

    <v-card class="ml-2 mr-2" v-else>
      <allFormInputs :formArray.sync="formArray"></allFormInputs>
    </v-card>
  </span>
</template>


<script>
import commonMixins from "@/mixins/commonMixins";
import { eventBus } from "@/main";
export default {
  name: "personalInfo",
  components: {},
  props: ["age", "complexView"],
  mixins: [commonMixins],
  data: () => ({
    formArray: [
      {
        type: "cTextField",
        label: "First Name*",
        name: "firstName",
        value: "",
        required: true
      },
      {
        type: "cTextField",
        label: "Middle Name*",
        name: "middleName",
        value: "",
        required: true
      },
      {
        type: "cTextField",
        label: "Last Name*",
        name: "lastName",
        value: "",
        required: true
      },
      {
        type: "cTextField",
        label: "Full Name*",
        name: "fullName",
        value: "",
        required: true
      },
      {
        type: "cTextField",
        label: "Father's Name*",
        name: "fatherName",
        value: "",
        required: true
      },
      {
        type: "cTextField",
        label: "Mother's Name*",
        name: "motherName",
        value: "",
        required: true
      },
      {
        type: "cAutoComplete",
        label: "Marital Status*",
        name: "maritalStatus",
        items: [
          { id: "Single", name: "Single" },
          { id: "Married", name: "Married" },
          { id: "Divorced", name: "Divorced" },
          { id: "Separated", name: "Separated" },
          { id: "Widow/Widower", name: "Widow/Widower" }
        ],
        required: true,
        value: ""
      },
      {
        type: "cAutoComplete",
        label: "Gender*",
        name: "gender",
        items: [
          { id: "Male", name: "Male" },
          { id: "Female", name: "Female" },
          { id: "Transgender", name: "Transgender" }
        ],
        required: true,
        value: ""
      },
      {
        type: "cDatePicker",
        value: "",
        label: "Date Of Birth*",
        name: "dateOfBirth",
        required: true
      },
      {
        type: "cAutoComplete",
        label: "Blood Group*",
        name: "bloodGroup",
        items: [
          { id: "A+", name: "A+" },
          { id: "A-", name: "A-" },
          { id: "B+", name: "B+" },
          { id: "B-", name: "B-" },
          { id: "O+", name: "O+" },
          { id: "O-", name: "O-" },
          { id: "AB+", name: "AB+" },
          { id: "AB-", name: "AB-" }
        ],
        required: true,
        value: ""
      },
      {
        type: "cTextField",
        label: "Nationality",
        name: "nationality",
        value: "",
        required: true
      },
      {
        type: "cTextField",
        label: "National Id No.",
        name: "nationalIdNo",
        value: "",
        required: true
      },
      {
        type: "cAutoComplete",
        label: "Religion*",
        name: "religionId",
        api: "/em/religion/getAll/active?page=0&pageSize=50",
        required: true,
        value: ""
      },
      {
        type: "cTextField",
        label: "Passport No.",
        name: "passportNumber",
        value: "",
        required: true
      },
      {
        type: "cDatePicker",
        value: "",
        label: "Passport Issue Date",
        name: "passportIssueDate",
        required: false
      },
      {
        type: "cDatePicker",
        value: "",
        label: "Passport Expiry Date",
        name: "passportExpiryDate",
        required: false
      },
      {
        type: "cTextField",
        label: "Mobile No.",
        name: "mobileNumber",
        value: "",
        required: true
      },
      {
        type: "cTextField",
        label: "Emergency Home Phn/Cell",
        name: "homePhoneNo",
        value: "",
        required: true
      },
      {
        type: "cTextField",
        label: "Direct Office Phn No",
        name: "directOfficePhoneNo",
        value: "",
        required: true
      },
      {
        type: "cTextField",
        label: "PABX/TNT/Hunting No",
        name: "pabxNo",
        value: "",
        required: true
      },
      {
        type: "cTextField",
        label: "PABX  Ext",
        name: "pabxExt",
        value: "",
        required: true
      }
    ]
  }),
  computed: {},
  methods: {
    reset() {
      console.log(this.$refs.form.reset());
      alert("clicked");
    }
  },
  watch: {},
  created() {
    eventBus.$on("updateThisForm", infoOfaId => {
      this.getAndFillDataByApi("/em/ei/employee/getActive/" + infoOfaId.id);
    });
  }
};
</script>
<style scoped></style>
