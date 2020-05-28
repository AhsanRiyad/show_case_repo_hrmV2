<template>
  <span>
    <baseTable :apiBase="apiBase" v-bind="$attrs" :tableHeader="tableHeader" :formArray="formArray">
      <template v-slot:formBaseTable=" age2 ">
        <allFormInputs :age2="age2" :formArray.sync="formArray"></allFormInputs>
      </template>
    </baseTable>
  </span>
</template>
<script>
import commonMixins from "../../mixins/commonMixins";
export default {
  name: "businessGroup",
  components: {},
  props: ["age"],
  mixins: [commonMixins],
  data: () => ({
    apiBase: "/ws/office/",
    tableHeader: [
      {
        text: "Office Name",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "Office Type", value: "officeTypeName" },
      { text: "Location ", value: "locationName" },
      { text: "Branch/SOLcode ", value: "solCode" },
      { text: "Start Date", value: "startDate" },
      { text: "End Date", value: "endDate" },
      { text: "Actions", value: "actions" }
    ],
    formArray: [
      {
        label: "Office Name*",
        type: "cTextField",
        name: "name",
        value: "Name",
        required: true
      },
      {
        label: "Office Type*",
        type: "cAutoComplete",
        name: "officeTypeId",
        api: "/ws/officeType/getAll/active?page=0&pageSize=50",
        required: true,
        value: ""
      },
      {
        label: "Office Description*",
        type: "cTextArea",
        name: "description",
        value: "",
        required: true
      },
      {
        label: "Office Location*",
        type: "cAutoComplete",
        name: "locationId",
        api: "/ws/location/getAll/active?page=0&pageSize=50",
        required: true,
        value: ""
      },
      {
        label: "Office Phone*",
        type: "cTextField",
        name: "phone",
        value: "",
        required: true
      },
      {
        label: "Office Email*",
        type: "cTextField",
        name: "email",
        value: "",
        required: true
      },
      {
        label: "Start Date*",
        type: "cDatePicker",
        value: "",
        name: "startDate",
        required: true,
        max: "endDate"
      },
      {
        label: "End Date",
        type: "cDatePicker",
        value: "",
        name: "endDate",
        required: false,
        min: "startDate"
      }
    ]
  }),
  computed: {},
  watch: {},
  created() {}
};
</script>
<style scoped></style>
