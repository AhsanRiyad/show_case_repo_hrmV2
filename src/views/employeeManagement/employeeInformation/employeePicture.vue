<template>
  <span>
    <v-subheader>
      Picture
      <v-divider inset></v-divider>
    </v-subheader>
    <v-card class="ml-2 mr-2">
      <v-col cols="4">
        <v-img :src="profilePic" aspect-ratio="1"></v-img>
      </v-col>
      <!-- <v-file-input class="mt-3" show-size accept="image/*" label="Upload Photo"></v-file-input> -->
      <v-col cols="8" class="mt-n5">
        <v-form ref="form">
          <allFormInputs :formArray.sync="formArray"></allFormInputs>
        </v-form>
        <v-btn @click="submitHere" tile class="red darken-1 white--text mt-0">UPLOAD</v-btn>
      </v-col>
    </v-card>
  </span>
</template>

<script>
import commonMixins from "@/mixins/commonMixins";
import { eventBus } from "@/main";
export default {
  name: "employeePicture",
  mixins: [commonMixins],
  data: vm => ({
    infoOfaIdFromProps: {},
    apiBase: "/em/ei/employee/profilePic/",
    formArray: [
      {
        type: "cFileInput",
        value: null,
        label: "SELECT PICTURE",
        name: "file",
        showInput: true,
        rules: [v => !!v || "File is required"],
        multiple: false,
        accept: "image/*",
        required: false,
        haveBtn: false,
        readonly: false,
        href: vm.$store.state.apiBase + "/em/eduQualification/file/",
        btnLabel: "Download Certificate"
      }
    ]
  }),
  computed: {},
  methods: {
    submitHere() {
      this.$store.commit("setRequestMethod", "put");
      // console.log(this.infoOfaIdFromProps);

      //validate the form
      if (!this.$refs.form.validate()) return;
      console.log(this.infoOfaIdFromProps);

      let mergedValue = {
        ...this.infoOfaIdFromProps,
        file: this.formArray[0].value[0]
      };
      console.log(mergedValue);

      let formData = new FormData();

      // formData.append('file' , mergedValue.file);
      console.log(formData);

      this.R.forEachObjIndexed((v, k) => {
        formData.append(k, v);
      }, mergedValue);

      console.log(formData);

      //a very common getData function for baseTable, will be call at the created lifeCycle hook
      // this.apiRequestData.method = newOrviewOrEditOrCorrection == 'new' ? 'post' : 'put';
      this.apiRequestData.api = this.apiBase;
      this.apiRequestData.item = formData;
      //this will help decide the header if it will be createdBy or updatedBy
      this.apiRequestData.newOrviewOrEditOrCorrection = "edit";
      //axios calling, actions will be dispatched asynchronously
      this.$store
        .dispatch("callApi", this.apiRequestData)
        .then(response => {
          console.log(response);

          this.infoOfaIdFromProps = { ...response };

          //success dialog
          this.$awn.success(`Successfully`);
        })
        .catch(() => {
          this.$awn.alert(`Connection Error`);
          this.tableLoading = false;
        });
    }
  },
  watch: {
    infoOfaIdFromProps: {
      handler: function(newVal, oldVal) {
        console.log("in the watch new");
        console.log(newVal);
        console.log("in the watch old");
        console.log(oldVal);

        if (!this.R.isNil(newVal)) {
          if (!this.R.isNil(newVal.profilePic)) {
            this.profilePic =
              this.$store.state.apiBase +
              "/em/ei/employee/profilePic/" +
              newVal.profilePic;
          }
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    //this event is firing from editEmployee.vue for filling data in the form
    eventBus.$on("updateThisForm", infoOfaId => {
      this.getAndFillDataByApi("/em/ei/employee/getActive/" + infoOfaId.id);
    });
  }
};
</script>
<style scoped></style>
