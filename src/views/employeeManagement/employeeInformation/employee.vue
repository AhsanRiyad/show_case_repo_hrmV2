<template>
  <span>
    <baseTable
      :apiBase="apiBase"
     :tableHeader="tableHeader">
      <template v-slot:formBaseTable>
        <newEmployee />
      </template>

      <!-- complexView for editEmployee -->
      <template v-slot:otherDialog>
        <editEmployee />
      </template>

    </baseTable>
  </span>
</template>
<script>
import commonMixins from "@/mixins/commonMixins";
import newEmployee from "./newEmployee";
import editEmployee from "../editEmployee";

export default {
  name: "employee",
  components: { newEmployee, editEmployee },
  mixins: [commonMixins],
  data: () => ({
    apiBase:'/em/ei/employee/',
    tableHeader: [
      {
        text: "Employee Id",
        align: "start",
        sortable: false,
        value: "empId"
      },
      { text: "Employee Number", value: "employeeNumber" },
      { text: "Employee Name", value: "firstName" },
      { text: "Employee Type", value: "employeeTypeName" },
      { text: "Organization", value: "organizationName" },
      { text: "Office", value: "officeName" },
      { text: "Grade", value: "gradeName" },
      { text: "Start Date", value: "startDate" },
      { text: "End Date", value: "endDate" },
      { text: "Actions", value: "actions" }
    ]
  }),
  computed: {},
  watch: {},
  created() {}
};
</script>
<style scoped></style>
