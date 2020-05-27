<template>
  <span>
    <baseTable
      :tableHeader="tableHeader"
      :formArray="formArray"
      booleanValueInTheTable="costCenter"
    >
      <template v-slot:formBaseTable=" age2 ">
        <allFormInputs :age2="age2" :formArray.sync="formArray"></allFormInputs>
      </template>
    </baseTable>
  </span>
</template>
<script>
import commonMixins from "../../mixins/commonMixins";
export default {
  name: "organizationHead",
  components: {},
  props: ["age"],
  mixins: [commonMixins],
  data: (vm) => ({
    tableHeader: [
      {
        text: "Organization Name",
        align: "start",
        sortable: false,
        value: "organizationName"
      },
      { text: "Employee Name", value: "employeeName" },
      { text: "Employee Id", value: "employeeId" },
      { text: "Start Date", value: "startDate" },
      { text: "End Date", value: "endDate" },
      { text: "Actions", value: "actions" }
    ],
    formArray: [
      {
        type: "cTreeSelect",
        label: "Select Organiztion",
        name: "organizationId",
        value: null,
        visible: true,
        required: true
      },
      {
        type: "cAutoComplete",
        label: "Employee*",
        name: "employeeId",
        api: "/em/ei/employee/getAll/active/dropdown/",
        required: true,
        items: [],
        value: ""
      },
      {
        type: "cTextField",
        label: "Search Employee*",
        name: "searchEmployee",
        value: "",
        filled: true,
        appendIcon: "search",
        required: false,
        keyUpEvent: vm.updateEmployeeList,
        shouldInclude: false,
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
  methods:{
    updateEmployeeList(n) {
      let index = this.R.findIndex(this.R.propEq("name", "employeeId"))(
        this.formArray
      );
      //a very common getData function for baseTable, will be call at the created lifeCycle hook
      this.$store.commit('setRequestMethod', 'get');
      this.apiRequestData.api = "/em/ei/employee/getAll/active/dropdown/" + n.value;
      this.apiRequestData.item = {};
      //axios calling, actions will be dispatched asynchronously
      this.$store.dispatch("callApi", this.apiRequestData).then(response => {
        console.log(response);
        this.formArray[index].items = response;
      });
    },
  },
  computed: {},
  watch: {},
  created() {}
};
</script>
<style scoped></style>
