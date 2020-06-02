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
  name: "adminRole",
  components: {},
  mixins: [commonMixins],
  data: () => ({
    apiBase: "/admin/role/",
    componentName: "Role",
    tableHeader: [
      {
        text: "Name",
        align: "start",
        sortable: false,
        value: "name"
      },
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
        type: "cAutoComplete",
        label: "Menu*",
        name: "menus",
        api: "/admin/menu/getAll/active?page=0&pageSize=100",
        required: true,
        value: "",
        chips: true,
        multiple: true,
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
