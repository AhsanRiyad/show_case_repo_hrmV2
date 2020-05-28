<template>
  <span>
    <v-subheader>
      Employee Basic
      <v-divider inset></v-divider>
    </v-subheader>
    <v-card class="ml-2 mr-2">
      <allFormInputs :formArray.sync="formArray"></allFormInputs>
    </v-card>
  </span>
</template>


<script>
import commonMixins from "@/mixins/commonMixins";
import { eventBus } from "@/main";
export default {
  name: "personalBasic",
  components: {},
  props: ["age"],
  mixins: [commonMixins],
  data: () => ({
    formArray: [
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
        name: "empId",
        value: "",
        readonly: true,
        required: false
      },
      {
        type: "cTextField",
        label: "Supervisor*",
        name: "supervisorName",
        value: "",
        readonly: true,
        required: false
      },
      {
        type: "cTextField",
        label: "Organization*",
        name: "organizationName",
        value: "",
        readonly: true,
        required: false
      },
      {
        type: "cTextField",
        label: "Grade*",
        name: "gradeName",
        value: "",
        readonly: true,
        required: false
      },
      {
        type: "cTextField",
        label: "Designation*",
        name: "designationName",
        value: "",
        readonly: true,
        required: false
      }
    ]
  }),
  computed: {},
  methods: {},
  watch: {},
  created() {
    eventBus.$on("updateForm", infoOfaId => {
      console.log('receiving the bus');
      console.log(infoOfaId);
      this.fillItemsIntheForm(infoOfaId);
    });
  }
};
</script>
<style scoped></style>
