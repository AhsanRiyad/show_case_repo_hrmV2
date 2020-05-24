<template>
  <span>
    <baseTable :tableHeader="tableHeader">
      <template v-slot:formBaseTable>
        <newEmployee />
      </template>
    </baseTable>
  </span>
</template>
<script>
import commonMixins from "@/mixins/commonMixins";
import newEmployee from "./newEmployee";

export default {
  name: "employee",
  components: { newEmployee },
  mixins: [commonMixins],
  data: () => ({
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
