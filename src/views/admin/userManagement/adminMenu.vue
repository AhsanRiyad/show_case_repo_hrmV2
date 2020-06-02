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
        <allFormInputs :formArray.sync="formArray"></allFormInputs>
      </template>
    </baseTable>
  </span>
</template>
<script>
import commonMixins from "@/mixins/commonMixins";

export default {
  name: "adminMenu",
  components: {},
  mixins: [commonMixins],
  data: () => ({
    apiBase: "/admin/menu/",
    componentName: "Menu",
    tableHeader: [
      {
        text: "Name",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "Url", value: "url" },
      { text: "Start Date", value: "startDate" },
      { text: "Actions", value: "actions" }
    ],
    formArray: [
      {
        type: "cTextField",
        label: "Name*",
        name: "name",
        value: "",
        required: true
      },
      {
        type: "cTextField",
        label: "Url*",
        name: "url",
        value: "",
        required: true
      },
      {
        type: "cDatePicker",
        value: "",
        label: "Start Date",
        name: "startDate",
        required: true,
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
