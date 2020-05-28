<template>
  <span>
    <v-subheader>
      Others
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
  name: "others",
  components: {},
  props: ["age"],
  mixins: [commonMixins],
  data: () => ({
    formArray: [
      {
        type: "cTextField",
        label: "Effective Start Date",
        name: "startDate",
        value: "",
        readonly: true,
        required: false
      },
      {
        type: "cTextField",
        label: "Effective End Date",
        name: "endDate",
        value: "",
        readonly: true,
        required: false
      },
      {
        type: "cTextField",
        label: "Created By",
        name: "createdBy",
        value: "",
        readonly: true,
        required: false
      },
      {
        type: "cTextField",
        label: "Created At",
        name: "organizationName",
        value: "",
        readonly: true,
        required: false
      },
      {
        type: "cTextField",
        label: "Updated By",
        name: "updatedBy",
        value: "",
        readonly: true,
        required: false
      },
      {
        type: "cTextField",
        label: "Updated At",
        name: "updatedAt",
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
    eventBus.$on("updateThisForm", infoOfaId => {
      console.log("i am office info");
      this.getAndFillDataByApi("/em/ei/employee/getActive/" + infoOfaId.id);
    });
  }
};
</script>
<style scoped></style>
