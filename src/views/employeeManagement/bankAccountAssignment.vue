<template>
  <span>
      <v-subheader>
        Bank Account Assignment
        <v-divider inset></v-divider>
      </v-subheader>
      <v-card class="ml-2 mr-2">
        <v-form ref="form">
          <allFormInputs :formArray.sync="formArray"></allFormInputs>
        </v-form>
        <v-container>
          <v-row>
            <v-col>
              <v-btn color="red darken-1" class="white--text" @click.stop="()=>callMe()">Reset</v-btn>
            </v-col>
            <v-col align="right">
              <v-btn color="red darken-1" class="white--text" @click.stop="submit">Submit</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
  </span>
</template>
<script>
import commonMixins from "@/mixins/commonMixins";

export default {
  name: "bankAccountAssignment",
  mixins: [commonMixins],
  data: vm => ({
    formArray: [
      {
        type: "cAutoComplete",
        label: "Supervisor Name*",
        name: "supervisorId",
        items: [],
        required: true,
        api: "/em/ei/employee/getAll/active/dropdown/",
        value: ""
      },
      {
        type: "cTextField",
        label: "Search Supervisor by Id",
        name: "searchSupervisor",
        value: "",
        filled: true,
        appendIcon: "search",
        required: false,
        keyUpEvent: vm.updateDependentField,
        dependentFieldName: "supervisorId",
        dependentApi: "/em/ei/employee/getAll/active/dropdown/",
        shouldInclude: false
      },
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
  methods: {
    
    callMe() {
      console.log("called me");
      console.log(this);
      console.log(this.$refs.form.validate());
    },
    closeDialog() {
      console.log(this.$parent.$children);
    },
    submit(){
      console.log(this);
      console.log('in the form submit');
       if (!this.$refs.form.validate()) return;
    }
  },
  watch: {},
  created() {}
};
</script>
<style scoped></style>
