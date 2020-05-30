<template>
  <span>
    <v-container>
      <v-subheader>
        Address
        <v-divider inset></v-divider>
      </v-subheader>
      <v-card class="ml-2 mr-2">
        <v-form ref="form">
          <v-row>
            <v-col>
              <v-subheader>
                Present Address
                <v-divider inset></v-divider>
              </v-subheader>
              <v-card class="ml-2 mr-2">
                <v-textarea
                  filled
                  rows="2"
                  :label="formArray[0].label"
                  v-model="formArray[0].value"
                  :rules="fieldRulesProp( !R.isNil(formArray[0].required) ? formArray[0].required : true ,  formArray[0].name)"
                  :readonly="!R.isNil(formArray[0].readonly) ? formArray[0].readonly : false"
                  :clearable="!R.isNil(formArray[0].readonly) ? !formArray[0].readonly : true"
                  :disabled="!R.isNil(formArray[0].disabled) ? !formArray[0].disabled : false"
                  autocomplete="off"
                ></v-textarea>

                <v-textarea
                  filled
                  rows="2"
                  :label="formArray[1].label"
                  v-model="formArray[1].value"
                  :rules="fieldRulesProp( !R.isNil(formArray[1].required) ? formArray[1].required : true ,  formArray[1].name)"
                  :readonly="!R.isNil(formArray[1].readonly) ? formArray[1].readonly : false"
                  :clearable="!R.isNil(formArray[1].readonly) ? !formArray[1].readonly : true"
                  :disabled="!R.isNil(formArray[1].disabled) ? !formArray[1].disabled : false"
                  autocomplete="off"
                ></v-textarea>
              </v-card>
            </v-col>

            <v-col>
              <v-subheader>
                Permanent Address
                <v-divider inset></v-divider>
              </v-subheader>
              <v-card class="ml-2 mr-2">
                <v-textarea
                  filled
                  rows="2"
                  :label="formArray[2].label"
                  v-model="formArray[2].value"
                  :rules="fieldRulesProp( !R.isNil(formArray[2].required) ? formArray[2].required : true ,  formArray[2].name)"
                  :readonly="!R.isNil(formArray[2].readonly) ? formArray[2].readonly : false"
                  :clearable="!R.isNil(formArray[2].readonly) ? !formArray[2].readonly : true"
                  :disabled="!R.isNil(formArray[2].disabled) ? !formArray[2].disabled : false"
                  autocomplete="off"
                ></v-textarea>

                <v-textarea
                  filled
                  rows="2"
                  :label="formArray[3].label"
                  v-model="formArray[3].value"
                  :rules="fieldRulesProp( !R.isNil(formArray[3].required) ? formArray[3].required : true ,  formArray[3].name)"
                  :readonly="!R.isNil(formArray[3].readonly) ? formArray[3].readonly : false"
                  :clearable="!R.isNil(formArray[3].readonly) ? !formArray[3].readonly : true"
                  :disabled="!R.isNil(formArray[3].disabled) ? !formArray[3].disabled : false"
                  autocomplete="off"
                ></v-textarea>
              </v-card>
            </v-col>
          </v-row>
          <slot name="buttons" v-bind:funAction="{ reset: reset, submit: nativeSubmit }"></slot>
        </v-form>
      </v-card>
    </v-container>
  </span>
</template>

<script>
import commonMixins from "@/mixins/commonMixins";
import { eventBus } from "@/main";
export default {
  name: "employeeAddress",
  components: {},
  props: ["age", "complexView"],
  mixins: [commonMixins],
  data: () => ({
    apiBase: "/em/ei/employee/addressInfo/",
    formArray: [
      {
        type: "cTextField",
        label: "Address 1*",
        name: "presentAddressOne",
        value: "",
        readonly: false,
        required: true
      },
      {
        type: "cTextField",
        label: "Address 2*",
        name: "presentAddressTwo",
        value: "",
        readonly: false,
        required: true
      },
      {
        type: "cTextField",
        label: "Address 1*",
        name: "permanentAddressOne",
        value: "",
        readonly: false,
        required: true
      },
      {
        type: "cAutoComplete",
        label: "Address 2*",
        name: "permanentAddressTwo",
        required: true,
        value: ""
      }
    ]
  }),
  computed: {},
  methods: {
    reset() {
      console.log(this.$refs.form.reset());
      alert("clicked");
    },
    nativeSubmit() {
      this.$store.commit("setRequestMethod", "put");
      this.submit("edit");
    }
  },
  watch: {},
  created() {
    //this event is firing from editEmployee.vue for filling data in the form
    eventBus.$on("updateThisForm", infoOfaId => {
      console.log("i am office info");
      this.getAndFillDataByApi("/em/ei/employee/addressInfo/getActive/" + infoOfaId.id);
    });
  }
};
</script>
<style scoped></style>
