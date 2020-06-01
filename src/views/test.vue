<template>
  <div>
    <v-file-input v-model="file"  label="File input"></v-file-input>
    <v-btn color="error" @click.stop="submit">
      Submit
    </v-btn>
  </div>
</template>

<script>
import commonMixins from "../mixins/commonMixins";
export default {
  name: "test",
  mixins: [commonMixins],
  components: {},
  data() {
    return {
      file: '',

      activeBtn: 1,
      activeTab: "",
      tab: null,

      tabItems: [
        {
          href: "personal",
          title: "Personal",
          component: "personalInfo"
        },
        {
          href: "office",
          title: "Office",
          component: "officeInfo"
        }
      ],

      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      bottomTabs: [
        {
          name: "Family Member Info",
          cName: "familyMember"
        },
        {
          name: "Nominee Info",
          cName: "nomineeInfo"
        },
        {
          name: "Education Info",
          cName: "educationalQualification"
        },
        {
          name: "Career Detail",
          cName: "career"
        },
        {
          name: "Probation",
          cName: "probation"
        },
        {
          name: "Professional Info",
          cName: "professionalQualification"
        } /*,
            {
                name: 'Working Condition',
                cName: 'workingCondition'
            }*/
      ]
    };
  },
  methods: {

    submit(){

      console.log(this.file);

      let formData = new FormData();
        formData.append('file', this.file);

      this.$axios.post( "http://hrm.babl.xyz/hrm-server-v2/api/em/professionalInfo/sig" ,
          formData,
          { 
            headers: {
              'Authorization': 'Bearer ' + this.$cookies.get("accessToken") ,
              'Content-Type': 'multipart/form-data'
            }
          }
          ).then(function(response){

            console.log(response);

          }.bind(this))
          .catch(function(err){
          console.log(err)
          }.bind(this));


    },

    reset() {
      alert("in my reset function");
      console.log(this.$refs);
    },
    tabClick() {
      console.log(this);
    },
    openDialog(name) {
      console.log(this);

      console.log(name);
      console.log(this.activeTab);
      this.myDialogVisible = true;
    }
  }
};
</script>
