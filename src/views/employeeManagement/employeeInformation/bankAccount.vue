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
        <slot
          name="buttons"
          v-bind:funAction="{ reset: reset, submit: nativeSubmit, isBankAccountExists: isBankAccountExists }"
        ></slot>
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
    //this is for employeeManagement->bankAccount for checking if Bank Account exists or not, always true as noly error will  make it false
    isBankAccountExists: true,
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
  methods: {
    submit(newOrviewOrEditOrCorrection) {
      //validate the form
      if (!this.$refs.form.validate()) return;

      //remove the search or non-takenable fields
      let formArray = [
        ...this.R.reject(n => n.shouldInclude == false)(this.formArray)
      ];

      //organize the input form, first formate the array using map, then make the a an object using mergeAll
      let formInputValues = this.R.pipe(
        this.R.map(n => {
          return { [n.name]: n.value };
        }),
        this.R.mergeAll()
      )(formArray);
      console.log(formInputValues);
      console.log(this.apiBase);
      //for preventing the props from mutation
      let mergedVal =
        this.R.has("infoOfaId", this.$props) &&
        this.R.isNil(this.infoOfaIdFromProps)
          ? this.infoOfaId
          : this.infoOfaIdFromProps;

      console.log("in the submit function");
      console.log(mergedVal);

      // merge the value that is required for updating a entity
      newOrviewOrEditOrCorrection == "edit" ||
      newOrviewOrEditOrCorrection == "correction"
        ? (formInputValues = { ...mergedVal, ...formInputValues })
        : "";
      console.log("after merging");
      console.log(formInputValues);

      //this is for employeeManagement -> family member , where employeeId is required for posting data
      formInputValues = {
        ...formInputValues,
        employeeId: this.$store.getters.getEmployeeId
      };

      //a very common getData function for baseTable, will be call at the created lifeCycle hook
      // this.apiRequestData.method = newOrviewOrEditOrCorrection == 'new' ? 'post' : 'put';
      this.apiRequestData.api = this.apiBase;
      this.apiRequestData.item = formInputValues;
      //this will help decide the header if it will be createdBy or updatedBy
      this.apiRequestData.newOrviewOrEditOrCorrection = newOrviewOrEditOrCorrection;
      //axios calling, actions will be dispatched asynchronously
      this.$store
        .dispatch("callApi", this.apiRequestData)
        .then(response => {
          console.log(response);
          this.$awn.success(`Successfully`);

          this.getAndFillDataByApi(
            "/em/ei/bankAccount/getActive/" + this.$store.getters.getEmployeeId
          );
        })
        .catch(() => {
          this.$awn.alert(`Connection Error`);
          this.tableLoading = false;
        });
    },
    getAndFillDataByApi(extention) {
      //a very common getData function for baseTable, will be call at the created lifeCycle hook
      this.$store.commit("setRequestMethod", "get");
      this.apiRequestData.api = extention;
      this.apiRequestData.item = {};
      //axios calling, actions will be dispatched asynchronously
      this.$store
        .dispatch("callApi", this.apiRequestData)
        .then(response => {
          //saves the items from the database in the table
          this.infoOfaIdFromProps = this.items = response;
          this.fillItemsIntheForm(this.items);
          this.isBankAccountExists = true;

          //this is form employeeManagement->bankAccount for checking if bankAccount exists or not
        })
        .catch(() => {
          new Promise(resolve => {
            this.$refs.form.reset();
            resolve();
          }).then(() => {
            this.formArray[
              this.R.findIndex(this.R.propEq("name", "accountType"))(
                this.formArray
              )
            ].value = "Savings";
          });

          // this.formArray[ this.R.findIndex(this.R.propEq('name', 'accountType'))(this.formArray)].value = "Savings";

          console.log(
            this.R.findIndex(this.R.propEq("name", "accountType"))(
              this.formArray
            )
          );

          //this is for having default value saving in the account type field
          this.isBankAccountExists = false;
        });
    }
  },
  watch: {},
  created() {
    //this event is firing from editEmployee.vue for filling data in the form
    eventBus.$on("updateThisForm", infoOfaId => {
      console.log("i am bank account info");
      console.log(infoOfaId);
      this.getAndFillDataByApi(
        "/em/ei/bankAccount/getActive/" + this.$store.getters.getEmployeeId
      );
    });
  }
};
</script>
<style scoped></style>
