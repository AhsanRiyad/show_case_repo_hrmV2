<template>
  <span>
    <baseTable
      :apiBase="apiBase"
      :componentName="componentName"
      v-bind="$attrs"
      :tableHeader="tableHeader"
      :formArray="formArray"
    >
      <template v-slot:formBaseTable>
        <allFormInputs  :formArray.sync="formArray"></allFormInputs>
      </template>
    </baseTable>
  </span>
</template>
<script>
import commonMixins from "@/mixins/commonMixins";

export default {
  name: "neverLockAccount",
  components: {},
  mixins: [commonMixins],
  data: vm => ({
    apiBase: "/admin/user/neverLock/",
    componentName: 'Never Lock',
    tableHeader: [
      {
        text: "Employee Id",
        align: "start",
        sortable: false,
        value: "empId"
      },
      { text: "Employee Name", value: "empName" },
      { text: "Grade", value: "grade" },
      { text: "Contact Number", value: "phone" },
      { text: "Organization", value: "organization" },
      { text: "Actions", value: "actions" }
    ],
    formArray: [
      {
        type: "cAutoComplete",
        label: "Employee*",
        name: "employeeId",
        api: "/em/ei/employee/getAll/active/dropdown/",
        required: true,
        items: [],
        value: "",
        height: 20,
        changeEvent: vm.updateDependentFieldForAdminResetPass,
        dependentFieldName: "familyRelationTypeId",
        dependentApi: "/em/ei/employee/getActive/"
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
        shouldInclude: false,
        height: 20
      },
    ]
  }),
  computed: {},
  watch: {},
  created() {}
};
</script>
<style scoped></style>
