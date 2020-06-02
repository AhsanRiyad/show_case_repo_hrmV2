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
  name: "adminSubMenu",
  components: {},
  mixins: [commonMixins],
  data: () => ({
    apiBase: "/admin/subMenu/",
    componentName: "Sub Menu",
    tableHeader: [
      {
        text: "Name",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "Url", value: "appUrl" },
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
        name: "appUrl",
        value: "",
        required: true
      },
      {
        type: "cAutoComplete",
        label: "Menu*",
        name: "menuId",
        api: "/admin/menu/getAll/active?page=0&pageSize=100",
        required: true,
        value: ""
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
