<template>
  <span>
      <v-subheader>
        Employee Basic
        <v-divider inset></v-divider>
      </v-subheader>
      <v-card class="ml-2 mr-2">
        <allFormInputs :formArray.sync="personalInfo"></allFormInputs>
      </v-card>
  </span>
</template>


<script>
import commonMixins from "@/mixins/commonMixins";
export default {
  name: "personalBasic",
  components: {},
  props: ["age"],
  mixins: [commonMixins],
  data: () => ({
    personalInfo: [
      {
        type: "cTextField",
        label: "Name*",
        name: "firstName",
        value: "",
        readonly: true,
        required: false
      },
      {
        type: "cTextField",
        label: "Employee Id*",
        name: "firstName",
        value: "",
        readonly: true,
        required: false
      },
      {
        type: "cTextField",
        label: "Supervisor*",
        name: "firstName",
        value: "",
        readonly: true,
        required: false
      },
      {
        type: "cTextField",
        label: "Organization*",
        name: "firstName",
        value: "",
        readonly: true,
        required: false
      },
      {
        type: "cTextField",
        label: "Grade*",
        name: "firstName",
        value: "",
        readonly: true,
        required: false
      },
      {
        type: "cTextField",
        label: "Designation*",
        name: "firstName",
        value: "",
        readonly: true,
        required: false
      },
    ],
  }),
  computed: {},
  methods: {},
  watch: {},
  created() {}
};
</script>
<style scoped></style>
