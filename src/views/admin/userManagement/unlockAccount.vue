<template>
  <span>
    <v-form ref="form">
      <allFormInputs :formArray.sync="formArray"></allFormInputs>
    </v-form>
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th colspan="2" class="grey lighten-3 black--text text-center">Employee Information</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Employee Id : {{ items.empId }}</td>
            <td>Status : {{ items.statusOne }}</td>
          </tr>
          <tr>
            <td>Full Name : {{ items.fullName }}</td>
            <td>Supervisor Name : {{ items.supervisorName }}</td>
          </tr>
          <tr>
            <td>Grade Name : {{ items.gradeName }}</td>
            <td>Designation : {{ items.designationName }}</td>
          </tr>
          <tr>
            <td>PABX Number : {{ items.pabxNo }}</td>
            <td>PABX Ext : {{ items.pabxExt }}</td>
          </tr>
          <tr>
            <td>Personal Email : {{ items.personalEmail }}</td>
            <td>Office Email : {{ items.officeEmail }}</td>
          </tr>
          <tr>
            <td>Organization Id : {{ items.organizationId }}</td>
            <td>Organization Name : {{ items.organizationName }}</td>
          </tr>
          <tr>
            <td colspan="2" class="text-center">
              <v-btn
                @click.stop="resetPassword"
                small
                color="red darken-1"
                class="white--text mb-10"
              >Reset Password</v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </span>
</template>
<script>
import commonMixins from "@/mixins/commonMixins";
export default {
  name: "unlockAccount",
  components: {},
  mixins: [commonMixins],
  data: vm => ({
    apiBase: "/admin/user/unlock/",
    formArray: [
      {
        type: "cAutoComplete",
        label: "Employee*",
        name: "employeeId",
        api: "/em/ei/employee/getAll/active/dropdown/",
        required: true,
        items: [],
        value: "",
        height: 20,
        changeEvent: vm.updateDependentFieldForAdminResetPass,
        dependentFieldName: "familyRelationTypeId",
        dependentApi: "/em/ei/employee/getActive/"
      },
      {
        type: "cTextField",
        label: "Search Employee*",
        name: "searchEmployee",
        value: "",
        filled: true,
        appendIcon: "search",
        required: false,
        keyUpEvent: vm.updateDependentField,
        dependentFieldName: "employeeId",
        dependentApi: "/em/ei/employee/getAll/active/dropdown/",
        shouldInclude: false,
        height: 20
      }
    ],
    items: []
  }),
  computed: {},
  methods: {
    updateDependentFieldForAdminResetPass(
      idOrValue,
      dependentFieldName,
      dependentApi
    ) {
      //a very common getData function for baseTable, will be call at the created lifeCycle hook
      this.$store.commit("setRequestMethod", "get");
      this.apiRequestData.api = dependentApi + idOrValue;
      this.apiRequestData.item = {};
      //axios calling, actions will be dispatched asynchronously
      this.$store.dispatch("callApi", this.apiRequestData).then(response => {
        this.items = response;
        console.log(response);
      }).catch((err)=>{
        console.log('error in the reset');
        console.log(err);
      });
      // this.formArray[index].items = [{ name: "cc", id: "cc" }];
      // this.formArray[index].type ='cTextField';
    },
    resetPassword() {
      if (!this.$refs.form.validate()) return;

      this.$store.commit("setRequestMethod", "put");
      this.apiRequestData.api = this.apiBase + this.items.empId;
      this.apiRequestData.item = {};
      //axios calling, actions will be dispatched asynchronously
      this.$store.dispatch("callApi", this.apiRequestData).then(response => {
        
        //recall the method for getting updated data
        this.updateDependentFieldForAdminResetPass(
          response.empId,
          "",
          "/em/ei/employee/getActive/"
        );

        console.log(response);
      });
    }
  },
  watch: {},
  created() {}
};
</script>
<style scoped></style>
