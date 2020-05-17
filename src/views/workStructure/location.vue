<template>
  <span>
    <baseTable
      :tableHeader="tableHeader"
      :formArray="formArray"
    >
      <template v-slot:formBaseTable=" age2 ">
        <allFormInputs  :age2="age2" :formArray.sync="formArray"></allFormInputs>
      </template>
    </baseTable>
  </span>
</template>
<script>
import commonMixins from "../../mixins/commonMixins";
export default {
  name: "grade",
  components: {},
  props: ["age"],
  mixins: [commonMixins],
  data: () => ({
    tableHeader: [
      {
        text: "Location Name",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "Start Date", value: "startDate" },
      { text: "End Date", value: "endDate" },
      { text: "Actions", value: "actions" }
    ],
    formArray: [
      {
        type: "cTextField",
        label: "Location Name*",
        name: "name",
        value: "Name",
        required: true,
      },
      {
        type: "cTextArea",
        label: "Address 1*",
        name: "address1",
        value: "",
        required: true,
      },
      {
        type: "cTextArea",
        label: "Address 2*",
        name: "address2",
        value: "",
        required: true,
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
  computed: {},
  watch: {},
  created() {}
};
</script>
<style scoped></style>
