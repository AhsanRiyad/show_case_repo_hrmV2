<template>
  <span>
    <v-subheader>
      Office Information
      <v-divider inset></v-divider>
    </v-subheader>

    <!-- complexView for editEmployee, connected with baseTable, editEmployee.vue -->
    <v-card class="ml-2 mr-2" v-if="complexView !== undefined">
      <v-form ref="form">
        <allFormInputs :formArray.sync="formArray"></allFormInputs>
        <slot name="buttons" v-bind:funAction="{ reset: reset, submit: nativeSubmit }"></slot>
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
  name: "officeInfo",
  mixins: [commonMixins],
  props: ["age", "complexView"],
  data: vm => ({
    apiBase: "/em/ei/employee/officeInfo/",
    formArray: [
      {
        type: "cAutoComplete",
        label: "Employee Type*",
        name: "employeeTypeId",
        api: "/em/employeeType/getAll/active?page=0&pageSize=50",
        required: true,
        value: "",
        changeEvent: vm.updateDependentField,
        dependentFieldName: "employeeSubtypeId",
        dependentApi: "/em/employeeSubtype/getActive/"
      },
      {
        type: "cTextField",
        label: "Employee Sub Type*",
        name: "employeeSubtypeId",
        required: true,
        value: "",
        items: [],
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
        value: "",
        
      },
      {
        type: "cTextField",
        label: "Search Supervisor by Id",
        name: "searchSupervisor",
        value: "",
        filled: true,
        appendIcon: "search",
        required: false,
        keyUpEvent: vm.updateDependentField,
        dependentFieldName: "supervisorId",
        dependentApi: "/em/ei/employee/getAll/active/dropdown/",
        shouldInclude: false
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
    //this event is firing from editEmployee.vue for filling data in the form
    eventBus.$on("updateThisForm", infoOfaId => {
      console.log("i am office info");
      this.getAndFillDataByApi("/em/ei/employee/getActive/" + infoOfaId.id);
    });
  }
};
</script>
<style scoped></style>
