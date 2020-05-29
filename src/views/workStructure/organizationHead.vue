<template>
  <span>
    <baseTable
      :tableHeader="tableHeader"
      :formArray="formArray"
      booleanValueInTheTable="costCenter"
      :apiBase="apiBase"
      :componentName="componentName"
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
    apiBase: "/ws/organizationHead/",
    componentName: "Organization Head" ,
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
        keyUpEvent: vm.updateDependentField,
        dependentFieldName: "employeeId",
        dependentApi: "/em/ei/employee/getAll/active/dropdown/",
        shouldInclude: false
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
  methods:{},
  computed: {},
  watch: {},
  created() {}
};
</script>
<style scoped></style>
