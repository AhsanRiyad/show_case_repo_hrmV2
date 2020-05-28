<template>
  <span>
    <v-subheader>
      Office Information
      <v-divider inset></v-divider>
    </v-subheader>
    <v-card class="ml-2 mr-2">
      <allFormInputs :formArray.sync="formArray"></allFormInputs>
    </v-card>
  </span>
</template>
<script>
import commonMixins from "@/mixins/commonMixins";
import { eventBus } from "@/main";
export default {
  name: "officeInfo",
  mixins: [commonMixins],
  data: vm => ({
    formArray: [
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
        items: [],
        required: true,
        api: "/em/ei/employee/getAll/active/dropdown/",
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
        value: "",
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
        api: "/em/assignmentCategory/getAll/active?page=0&pageSize=50",
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
    ]
  }),
  computed: {},
  methods: {
    updateEmployeeSubType(id) {
      console.log("in the update subtype");
      console.log(id);
      let index = this.R.findIndex(this.R.propEq("name", "employeeSubtypeId"))(
        this.formArray
      );
      console.log(index);

      //a very common getData function for baseTable, will be call at the created lifeCycle hook
      this.$store.commit("setRequestMethod", "get");
      this.apiRequestData.api = "/em/employeeSubtype/getActive/" + id;
      this.apiRequestData.item = {};

      //axios calling, actions will be dispatched asynchronously
      this.$store.dispatch("callApi", this.apiRequestData).then(response => {
        console.log(response);
        this.formArray[index].items = response;
      });

      // this.formArray[index].items = [{ name: "cc", id: "cc" }];
      // this.formArray[index].type ='cTextField';
    },
    updateSuperVisorList(n) {
      let index = this.R.findIndex(this.R.propEq("name", "supervisorId"))(
        this.formArray
      );
      //a very common getData function for baseTable, will be call at the created lifeCycle hook
      this.$store.commit("setRequestMethod", "get");
      this.apiRequestData.api =
        "/em/ei/employee/getAll/active/dropdown/" + n.value;
      this.apiRequestData.item = {};
      //axios calling, actions will be dispatched asynchronously
      this.$store.dispatch("callApi", this.apiRequestData).then(response => {
        console.log(response);
        this.formArray[index].items = response;
      });
    }
  },
  watch: {},
  created() {
    eventBus.$on("updateThisForm", infoOfaId => {
      console.log('i am office info');
      this.getAndFillDataByApi("/em/ei/employee/getActive/" + infoOfaId.id);
    });
  }
};
</script>
<style scoped></style>
