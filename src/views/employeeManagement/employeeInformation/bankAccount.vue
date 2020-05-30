<template>
  <span>
    <v-subheader>
      Bank Account
      <v-divider inset></v-divider>
    </v-subheader>
    <!-- complexView for editEmployee, connected with baseTable, editEmployee.vue -->
    <v-card class="ml-2 mr-2" v-if="complexView !== undefined">
      <v-form ref="form">
        <allFormInputs :formArray.sync="formArray"></allFormInputs>
        <slot name="buttons" v-bind:funAction="{ reset: reset, submit: nativeSubmit }"></slot>
      </v-form>
    </v-card>

    <v-card class="ml-2 mr-2" v-else>
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
  props: ["age", "complexView"],
  mixins: [commonMixins],
  data: () => ({
    apiBase: "/em/ei/bankAccount/",
    formArray: [
      {
        type: "cTextField",
        label: "Account Number*",
        name: "accountNumber",
        value: "",
        readonly: false,
        required: true
      },
      {
        type: "cTextField",
        label: "Account Type*",
        name: "accountType",
        value: "Savings",
        readonly: false,
        required: true
      },
      {
        type: "cAutoComplete",
        label: "Branch Name*",
        name: "branchId",
        api: "/ws/office/getAll/activeBranch/dropdown",
        required: true,
        value: ""
      }
    ]
  }),
  computed: {},
  methods: {},
  watch: {},
  created() {
    //this event is firing from editEmployee.vue for filling data in the form
    eventBus.$on("updateThisForm", infoOfaId => {
      console.log("i am bank account info");
      console.log(infoOfaId);
      this.getAndFillDataByApi("/em/ei/bankAccount/getActive/" + infoOfaId.id);
    });
  }
};
</script>
<style scoped></style>
