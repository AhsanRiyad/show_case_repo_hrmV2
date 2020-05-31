<template>
  <span>
    <v-form ref="form">
      <personalInfo ref="personalInfo" />
      <officeInfo ref="officeInfo" />
      <effectiveDate ref="effectiveDate" />
      <changeReason v-show="this.$store.getters.getRequestMethod == 'put'" ref="changeReason" />

      <v-container>
        <v-row>
          <v-col>
            <v-btn
              v-if=" $route.name == 'newEmployee' "
              class="m-3 white--text"
              color="red darken-1"
              @click.stop="$refs.form.reset()"
            >Reset</v-btn>
          </v-col>
          <v-col align="right">
            <v-btn
              v-if=" $route.name == 'newEmployee' "
              class="m-3 white--text"
              color="red darken-1"
              @click.stop="submit"
            >Submit</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </span>
</template>
<script>
import commonMixins from "@/mixins/commonMixins";
import personalInfo from "./personalInfo";
import officeInfo from "./officeInfo";
import effectiveDate from "./effectiveDate";
import changeReason from "./changeReason";
import { eventBus } from "@/main";

export default {
  name: "newEmployee",
  components: { personalInfo, officeInfo, effectiveDate, changeReason },
  mixins: [commonMixins],
  data: () => ({
    infoOfaId: {}
  }),
  computed: {},
  methods: {
    //update subfield for form field
    updateDependentFieldForEmployeeSubType(
      idOrValue,
      dependentFieldName,
      dependentApi,
      arrayTobeSearched
    ) {
      console.log("in the update subtype");
      console.log(idOrValue);
      let index = this.R.findIndex(this.R.propEq("name", dependentFieldName))(
        arrayTobeSearched
      );
      console.log(index);
      //a very common getData function for baseTable, will be call at the created lifeCycle hook
      this.$store.commit("setRequestMethod", "get");
      this.apiRequestData.api = dependentApi + idOrValue;
      this.apiRequestData.item = {};

      //axios calling, actions will be dispatched asynchronously
      this.$store.dispatch("callApi", this.apiRequestData).then(response => {
        console.log(response);
        arrayTobeSearched[index].items = response;
      });
      // this.formArray[index].items = [{ name: "cc", id: "cc" }];
      // this.formArray[index].type ='cTextField';
    },

    //this function will be fired to fill in the form when clicked on the view/edit/correction
    //it would be fired from baseTable, under action button menu
    //this is only applicable for employee route name
    fillItemsIntheForm(infoOfaId) {
      console.log("two or two");

      this.infoOfaId = infoOfaId;
      try {
        this.$refs.officeInfo.formArray.forEach((n, i) => {
          if (this.R.has(n.name, infoOfaId)) {
            this.$refs.officeInfo.formArray[i].value = infoOfaId[n.name];
          }
        });
        this.$refs.personalInfo.formArray.forEach((n, i) => {
          if (this.R.has(n.name, infoOfaId)) {
            this.$refs.personalInfo.formArray[i].value = infoOfaId[n.name];
          }
        });
        this.$refs.effectiveDate.formArray.forEach((n, i) => {
          if (this.R.has(n.name, infoOfaId)) {
            this.$refs.effectiveDate.formArray[i].value = infoOfaId[n.name];
          }
        });
        this.$refs.changeReason.formArray.forEach((n, i) => {
          if (this.R.has(n.name, infoOfaId)) {
            this.$refs.changeReason.formArray[i].value = infoOfaId[n.name];
          }
        });
      } catch (err) {
        console.log(err);
      }
    },
    //update subfield for form field
    updateDependentFieldByArray(
      idOrValue,
      dependentFieldName,
      dependentApi,
      arrayTobeSearched
    ) {
      console.log("in the update subtype");
      console.log(idOrValue);
      let index = this.R.findIndex(this.R.propEq("name", dependentFieldName))(
        arrayTobeSearched
      );
      console.log(index);
      //a very common getData function for baseTable, will be call at the created lifeCycle hook
      this.$store.commit("setRequestMethod", "get");
      this.apiRequestData.api = dependentApi + idOrValue;
      this.apiRequestData.item = {};

      //axios calling, actions will be dispatched asynchronously
      this.$store.dispatch("callApi", this.apiRequestData).then(response => {
        console.log(response);
        arrayTobeSearched[index].items = response;
      });
      // this.formArray[index].items = [{ name: "cc", id: "cc" }];
      // this.formArray[index].type ='cTextField';
    },
    closeDialog() {
      console.log(this.$parent.$children);
    },
    reset() {
      this.$refs.form.reset();
    },
    submit(newOrviewOrEditOrCorrection) {
      /* console.log(this.$refs.form.inputs) */
      /* let abc = 
      this.$refs.form.inputs.map((n)=>{
        return {
          [n.id] : n.value,
        }
      }) */
      /* let ind = 
      this.officeInfo.findIndex((n)=> n.name == 'orgParentId' ) 
      console.log(ind);
      console.log(this.officeInfo[ind]); */
      // console.log(this.$refs.officeInfo.officeInfo);
      /* let merge = [
        ...this.$refs.officeInfo.officeInfo,
        ...this.$refs.personalInfo.personalInfo,
        ...this.effectiveDate
      ]; */
      /* let abc = merge.map(n => {
        return {
          [n.name]: n.value
        };
      });

       */
      /*  console.log(
        this.R.concat(this.$refs.officeInfo.officeInfo , this.$refs.personalInfo.personalInfo, this.effectiveDate)
      ); */
      console.log("newEmployee submit");
      //form data
      if (!this.$refs.form.validate()) return;
      let employeeInfo = this.R.pipe(
        this.R.concat,
        this.R.concat(this.$refs.effectiveDate.formArray),
        this.R.concat(this.$refs.changeReason.formArray),
        this.R.map(n => ({ [n.name]: n.value })),
        this.R.mergeAll,
        this.R.omit(["searchSupervisor"])
      )(this.$refs.officeInfo.formArray, this.$refs.personalInfo.formArray);

      employeeInfo = this.R.mergeRight(this.infoOfaId, employeeInfo);
      /* eslint-disable  */
      console.log(employeeInfo);
      // if (1<2) return;
      /* eslint-enable  */

      this.apiRequestData.api = "/em/ei/employee";
      this.apiRequestData.item = employeeInfo;
      //this will help decide the header if it will be createdBy or updatedBy
      this.apiRequestData.newOrviewOrEditOrCorrection = newOrviewOrEditOrCorrection;

      console.log(employeeInfo);

      this.$store
        .dispatch("callApi", this.apiRequestData)
        .then(response => {
          console.log(response);
          this.doActionOnItem(newOrviewOrEditOrCorrection, this.apiRequestData);
          //success dialog
          this.$awn.success(`Successfully`);
        })
        .catch(() => {
          this.$awn.alert(`Connection Error`);
        });
    }
  },
  watch: {},
  created() {
    //this event is being fired from baseTable viewItem function, the the definition is in the common mixins file
    eventBus.$on("updateForm", infoOfaId => {
      setTimeout(() => {
        this.fillItemsIntheForm(infoOfaId);
      }, 100);
    });
  }
};
</script>
<style scoped></style>
