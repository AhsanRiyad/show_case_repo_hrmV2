<template>
  <span>
    <baseTable
      v-bind="$attrs"
      :tableHeader="tableHeader"
      :formArray="formArray"
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
  name: "companyClassType",
  components: {},
  props: ["age"],
  mixins: [commonMixins],
  data: vm => ({
    apiBase: "/ws/companyClassType/",
    componentName: "Company Classification Type" ,
    tableHeader: [
      {
        text: "Name",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "Description", value: "description" },
      { text: "Start Date", value: "startDate" },
      { text: "End Date", value: "endDate" },
      { text: "Actions", value: "actions" }
    ],

    formArray: [
      {
        type: "cTextField",
        label: "Company Classification Type Name",
        name: "name",
        value: "",
        required: true,
        fun: vm.ch
      },
      {
        type: "cTextField",
        label: "Company Classification Type Description",
        name: "description",
        required: true,
        value: ""
      },
      {
        type: "cDatePicker",
        value: "",
        label: "Start Date",
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
