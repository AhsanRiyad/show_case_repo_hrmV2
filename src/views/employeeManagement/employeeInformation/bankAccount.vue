<template>
  <span>
    <v-subheader>
      Bank Account
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
  name: "bankAccount",
  components: {},
  props: ["age"],
  mixins: [commonMixins],
  data: () => ({
    formArray: [
      {
        type: "cTextField",
        label: "Account Number*",
        name: "startDate",
        value: "",
        readonly: false,
        required: true
      },
      {
        type: "cTextField",
        label: "Account Type*",
        name: "endDate",
        value: "Savings",
        readonly: false,
        required: true
      },
      {
        type: "cAutoComplete",
        label: "Branch Name*",
        name: "branchName",
        api: "/ws/designation/getAll/active?page=0&pageSize=50",
        required: true,
        value: ""
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
