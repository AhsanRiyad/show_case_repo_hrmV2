<template>
  <span>
    <v-subheader>
      Email
      <v-divider inset></v-divider>
    </v-subheader>
    <v-card class="ml-2 mr-2">
      <v-form ref="form">
        <allFormInputs :formArray.sync="formArray"></allFormInputs>
        <slot name="buttons" v-bind:funAction="{ reset: reset, submit: nativeSubmit }"></slot>
      </v-form>
    </v-card>
  </span>
</template>

<script>
import commonMixins from "@/mixins/commonMixins";
import { eventBus } from "@/main";
export default {
  name: "employeeEmail",
  components: {},
  props: ["complexView"],
  mixins: [commonMixins],
  data: () => ({
    apiBase: "/em/ei/employee/notifyEmailInfo/",
    formArray: [
      {
        type: "cTextField",
        label: "Email*",
        name: "notifyEmail",
        value: "",
        readonly: false,
        required: true
      }
    ]
  }),
  computed: {},
  methods: {},
  watch: {},
  created() {
    eventBus.$on("updateThisForm", infoOfaId => {
      console.log("i am email info");
      this.getAndFillDataByApi("/em/ei/employee/notifyEmailInfo/getActive/" + infoOfaId.id);
    });
  }
};
</script>
<style scoped></style>
