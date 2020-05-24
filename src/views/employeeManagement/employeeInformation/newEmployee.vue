<template>
  <span>
    <v-form ref="form">
      <v-subheader>
        Personal Information
        <v-divider inset></v-divider>
      </v-subheader>

      <v-card class="ml-2 mr-2">
        <allFormInputs :formArray.sync="personalInfo"></allFormInputs>
      </v-card>

      <v-subheader>
        Office Information
        <v-divider inset></v-divider>
      </v-subheader>

      <v-card class="ml-2 mr-2">
        <allFormInputs :formArray.sync="officeInfo"></allFormInputs>
      </v-card>

      <v-subheader>
        Effective Date
        <v-divider inset></v-divider>
      </v-subheader>

      <v-card class="ml-2 mr-2">
        <allFormInputs :formArray.sync="effectiveDate"></allFormInputs>
      </v-card>

      <v-btn class="m-3 white--text" color="red darken-1" @click.stop="tryD">Submit</v-btn>
      <v-spacer></v-spacer>
      <v-btn class="m-3 white--text" color="red darken-1" @click.stop="tryD">Submit</v-btn>

      
    </v-form>
  </span>
</template>


<script>
import commonMixins from "@/mixins/commonMixins";
export default {
  name: "newEmployee",
  components: {},
  props: ["age"],
  mixins: [commonMixins],
  data: vm => ({
    tableHeader: [
      {
        text: "Business Group Name",
        align: "start",
        sortable: false,
        value: "name"
      },
      {
        text: "Company Classification Type Name",
        value: "companyClassTypeName"
      },
      { text: "Start Date", value: "startDate" },
      { text: "End Date", value: "endDate" },
      { text: "Actions", value: "actions" }
    ],
    personalInfo: [
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
    ],
    officeInfo: [
      {
        type: "cAutoComplete",
        label: "Employee Type*",
        name: "employeeTypeId",
        api: "/em/employeeType/getAll/active?page=0&pageSize=50",
        required: true,
        value: "",
        changeEvent: vm.updateEmployeeSubType
      },
      {
        type: "cAutoComplete",
        label: "Employee Sub Type*",
        name: "employeeSubtypeId",
        required: true,
        value: "",
        items: [{ id: "ff", name: "dd" }]
      },
      {
        type: "cTreeSelect",
        label: "Select Organization Tree",
        name: "organizationId",
        value: null,
        visible: true,
        required: true,
        clearData: false
      },
      {
        type: "cAutoComplete",
        label: "Supervisor Name*",
        name: "supervisorId",
        api: "/em/employee/getAll/active?page=0&pageSize=50",
        required: true,
        value: ""
      },
      {
        type: "cTextField",
        label: "Search Supervisor by Id",
        name: "searchSupervisor",
        value: "",
        filled: true,
        appendIcon: "search",
        required: false,
        keyUpEvent: vm.updateSuperVisorList
      },
      {
        type: "cTextField",
        label: "Group",
        name: "groupName",
        value: "",
        required: true
      },
      {
        type: "cAutoComplete",
        label: "Grade*",
        name: "gradeId",
        api: "/ws/grade/getAll/active?page=0&pageSize=50",
        required: true,
        value: ""
      },
      {
        type: "cAutoComplete",
        label: "Office*",
        name: "officeId",
        api: "/ws/office/getAll/active?page=0&pageSize=50",
        required: true,
        value: ""
      },
      {
        type: "cTextField",
        label: "Office Phone No.",
        name: "officePhoneNo",
        value: "",
        required: true
      },
      {
        type: "cTextField",
        label: "Office Email",
        name: "officeEmail",
        value: "",
        required: true
      },
      {
        type: "cTextArea",
        label: "Office Address",
        name: "officeAddress",
        value: "Name",
        required: false
      },
      {
        type: "cAutoComplete",
        label: "Designation*",
        name: "designationId",
        api: "/ws/designation/getAll/active?page=0&pageSize=50",
        required: true,
        value: ""
      },
      {
        type: "cDatePicker",
        value: "",
        label: "Date Of First Hired*",
        name: "dateOfFirstHired",
        required: false
      },
      {
        type: "cAutoComplete",
        label: "Assignment Category*",
        name: "assignmentCategoryId",
        api: "/em/assignment/getAll/active?page=0&pageSize=50",
        required: true,
        value: ""
      },
      {
        type: "cTextField",
        label: "Sole Code",
        name: "solCode",
        value: "",
        required: false
      },
      {
        type: "cTextField",
        label: "Cost Center",
        name: "castCenter",
        value: "",
        required: false
      },
      {
        type: "cTextField",
        label: "Other Information",
        name: "otherInfo",
        value: "",
        required: false
      },
      {
        type: "cTextArea",
        label: "Reference Info",
        name: "referenceInfo",
        value: "",
        required: false
      },
      {
        type: "cCheckBox",
        label: "Has Target",
        name: "sol",
        value: true
      },
      {
        type: "cDatePicker",
        value: "",
        label: "Last Posting Date*",
        name: "lastPostingDate",
        required: false
      },
      {
        type: "cTextField",
        label: "Status",
        name: "statusOne",
        value: "",
        required: false
      },
      {
        type: "cTextField",
        label: "Status Two",
        name: "statusTow",
        value: "",
        required: false
      }
    ],
    effectiveDate: [
      {
        type: "cDatePicker",
        value: "",
        label: "Effective Start Date",
        name: "startDate",
        required: false
      },
      {
        type: "cDatePicker",
        value: "",
        label: "Effective End Date",
        name: "endDate",
        required: false
      }
    ]
  }),
  computed: {},
  methods: {
    updateEmployeeSubType(id) {
      console.log("in the update subtype");
      console.log(id);
      let index = this.R.findIndex(this.R.propEq("name", "employeeSubtypeId"))(
        this.officeInfo
      );
      console.log(index);

      //a very common getData function for baseTable, will be call at the created lifeCycle hook
      this.apiRequestData.method = "get";
      this.apiRequestData.api = "/em/employeeSubtype/getActive/" + id;
      this.apiRequestData.item = {};

      //axios calling, actions will be dispatched asynchronously
      this.$store.dispatch("callApi", this.apiRequestData).then(response => {
        console.log(response);
        this.officeInfo[index].items = response;
      });

      // this.officeInfo[index].items = [{ name: "cc", id: "cc" }];
      // this.officeInfo[index].type ='cTextField';
    },
    updateSuperVisorList(n) {
      let index = this.R.findIndex(this.R.propEq("name", "supervisorId"))(
        this.officeInfo
      );
      //a very common getData function for baseTable, will be call at the created lifeCycle hook
      this.apiRequestData.method = "get";
      this.apiRequestData.api = "/em/employeeSubtype/getActive/" + n.id;
      this.apiRequestData.item = {};
      //axios calling, actions will be dispatched asynchronously
      this.$store.dispatch("callApi", this.apiRequestData).then(response => {
        this.officeInfo[index].items = response;
      });
    },
    tryD() {
      /* console.log(this.$refs.form.inputs) */
      /* let  abc = 
      this.$refs.form.inputs.map((n)=>{
        return {
          [n.id] : n.value,
        }
      }) */
      /* let ind = 
      this.officeInfo.findIndex((n)=> n.name == 'orgParentId' ) 
      console.log(ind);
      console.log(this.officeInfo[ind]); */

      this.$refs.form.validate();
      let merge = [
        ...this.personalInfo,
        ...this.officeInfo,
        ...this.effectiveDate
      ];
      let abc = merge.map(n => {
        return {
          [n.name]: n.value
        };
      });
      console.log(this.R.mergeAll(abc));
    }
  },
  watch: {},
  created() {}
};
</script>
<style scoped></style>
