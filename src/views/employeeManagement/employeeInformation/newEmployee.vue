<template>
  <span>
    <v-form ref="form">
      <personalInfo ref="personalInfo" />
      <officeInfo ref="officeInfo" />

      <v-subheader>
        Effective Date
        <v-divider inset></v-divider>
      </v-subheader>
      <v-card class="ml-2 mr-2">
        <allFormInputs :formArray.sync="effectiveDate"></allFormInputs>
      </v-card>

      <v-container>
        <v-row>
          <v-col>
            <v-btn class="m-3 white--text" color="red darken-1" @click.stop=" $refs.form.reset()">Reset</v-btn>
          </v-col>
          <v-col align="right">
            <v-btn class="m-3 white--text" color="red darken-1" @click.stop="tryD">Submit</v-btn>
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

export default {
  name: "newEmployee",
  components: { personalInfo, officeInfo },
  mixins: [commonMixins],
  data: () => ({
    effectiveDate: [
      {
        type: "cDatePicker",
        value: "",
        label: "Effective Start Date",
        name: "startDate",
        required: false
      },
      {
        type: "cDatePicker",
        value: "",
        label: "Effective End Date",
        name: "endDate",
        required: false
      }
    ]
  }),
  computed: {},
  methods: {
    tryD() {
      /* console.log(this.$refs.form.inputs) */
      /* let  abc = 
      this.$refs.form.inputs.map((n)=>{
        return {
          [n.id] : n.value,
        }
      }) */
      /* let ind = 
      this.officeInfo.findIndex((n)=> n.name == 'orgParentId' ) 
      console.log(ind);
      console.log(this.officeInfo[ind]); */

      this.$refs.form.validate();

      // console.log(this.$refs.officeInfo.officeInfo);

      let merge = [
        ...this.$refs.officeInfo.officeInfo,
        ...this.$refs.personalInfo.personalInfo,
        ...this.effectiveDate
      ];
      let abc = merge.map(n => {
        return {
          [n.name]: n.value
        };
      });
      console.log(this.R.mergeAll(abc));
    }
  },
  watch: {},
  created() {}
};
</script>
<style scoped></style>
