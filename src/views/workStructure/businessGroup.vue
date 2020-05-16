<template>
  <span>
    <baseTable
      apiBase="/ws/businessGroup/"
      v-bind="$attrs"
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
import commonMixins from "@/mixins/commonMixins";
export default {
  name: "businessGroup",
  components: {},
  props: ["age"],
  mixins: [commonMixins],
  data: vm => ({
    tableHeader: [
      {
        text: "Business Group Name",
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
        label: "Business Group Name*",
        name: "name",
        value: "",
        required: true,
        fun: vm.ch
      },
      {
        type: "cAutoComplete",
        label: "Company Classification Type*",
        name: "companyClassTypeId",
        api: "/ws/companyClassType/getAll/active",
        required: true,
        value: ""
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
