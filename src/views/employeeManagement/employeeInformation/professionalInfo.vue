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
  name: "professionalInfo",
  components: {},
  props: ["age"],
  mixins: [commonMixins],
  data: () => ({
    apiBase: "/em/professionalQua/",
    componentName: "Professional Qualification",
    tableHeader: [
      {
        text: "Qualification Title",
        align: "start",
        sortable: false,
        value: "qualTitle"
      },
      { text: "Qualification Area", value: "qualArea" },
      {
        text: "Institution",
        value: "institute"
      },
      { text: "Result", value: "result" },
      { text: "Start Date", value: "startDate" },
      { text: "End Date", value: "endDate" },
      { text: "Actions", value: "actions" }
    ],
    formArray: [
      {
        type: "cTextField",
        label: "Professional Qualification Title*",
        name: "qualTitle",
        value: "",
        required: true
      },
      {
        type: "cAutoComplete",
        label: "Area*",
        name: "professionalQuaAreaId",
        api: "/ws/office/getAll/activeBranch/dropdown",
        required: true,
        value: ""
      },
      {
        type: "cTextField",
        label: "Institute*",
        name: "institute",
        value: "",
        required: true
      },
      {
        type: "cTextField",
        label: "Result*",
        name: "result",
        value: "",
        required: true
      },
      {
        type: "cDatePicker",
        value: "",
        label: "Certificate Start Date",
        name: "startDate",
        required: true
      },
      {
        type: "cDatePicker",
        value: "",
        label: "Certificate End Date",
        name: "endDate",
        required: false
      },
    ]
  }),
  computed: {},
  watch: {},
  created() {}
};
</script>
<style scoped></style>
