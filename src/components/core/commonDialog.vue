<template>
  <v-row justify="center">
    <v-dialog
      transition="dialog-bottom-transition"
      v-model="intDialogVisible"
      persistent
      max-width="800px"
      :fullscreen="fullscreen"
    >
      <v-card>
        <v-app-bar class="white--text" dark color="red darken-1">
          <v-btn icon dark @click="intDialogVisible = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>City Bank</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="intDialogVisible = false">Close</v-btn>
          </v-toolbar-items>
        </v-app-bar>

        <v-container>
          <v-form ref="form">
            <!-- this pareVal is data passing props for its parent, previously it was used by scopped slot -->
            <slot ref="slotForm" :parentVal="parentVal" name="formDialog"></slot>
          </v-form>
        </v-container>

        <v-container>
          <slot ref="slotTable" :parentVal="parentVal" name="otherDialog"></slot>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            v-if="showOrHideCloseButton"
            color="red darken-1"
            text
            @click="intDialogVisible = false"
          >Close</v-btn>
          <v-btn
            v-if="showOrHideSaveButton"
            color="red darken-1"
            text
            @click.stop="nativeSubmit"
          >Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import commonMixins from "../../mixins/commonMixins";
import { mapGetters } from "vuex";
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    age: {
      type: [Number, String],
      default: undefined
    },
    formArray: {
      type: [Array],
      default: undefined
    },
    newOrviewOrEditOrCorrectionProps: {
      type: [String],
      default: "view"
    },
    infoOfaId: {
      type: [Object, Array],
      default: undefined
    },
    addChild: {
      type: [Function],
      default: undefined
    },
    fullscreen: {
      type: [Boolean],
      default: false
    },
    apiBase: {
      type: [String],
      default: undefined
    }
  },
  mixins: [commonMixins],
  data() {
    return {
      dialog: false,
      parentVal: "",
      infoOfaIdFromProps: {}
    };
  },
  computed: {
    ...mapGetters(["getRequestMethod"]),
    showOrHideSaveButton() {
      if (this.newOrviewOrEditOrCorrectionProps == "view") return false;
      else return true;
    },
    showOrHideCloseButton() {
      return true;
    },
    intDialogVisible: {
      get: function() {
        return this.dialogVisible;
      },
      set: function(value) {
        if (!value) {
          this.$emit("close");
        }
      }
    }
  },
  methods: {
    //this function will decide which function to call
    nativeSubmit() {
      this.newOrviewOrEditOrCorrectionProps == "new"
        ? this.$store.commit("setRequestMethod", "post")
        : this.$store.commit("setRequestMethod", "put");

      if (this.apiBase == "/em/ei/employee/") {
        //form slot->children named newEmployee.vue ->submit function
        this.$refs.form.$children[0].submit(
          this.newOrviewOrEditOrCorrectionProps
        );
      }
      //this includes a form
      /* else if (this.apiBase == "/em/eduQualification/") {
        this.submitForFormData(this.newOrviewOrEditOrCorrectionProps);
      } */
      else {
        this.submit(this.newOrviewOrEditOrCorrectionProps);
      }
    },
    closeDialog() {},
    clicked() {
      console.log("clicked");
    }
  },
  watch: {
    infoOfaId: {
      handler: function(newVal) {
        this.infoOfaIdFromProps = newVal;
      },
      immediate: true
    },
    getRequestMethod: {
      handler: function(newVal) {
        console.log("in the new");
        if (newVal == "post") {
          console.log(newVal);
          // this.$refs.form.reset();
        }
      },
      immediate: true
    }
  },
  created() {
    this.infoOfaIdFromProps = this.infoOfaId;
    console.log("form mounted");
  },
  mounted() {
    console.log("this is common dialog");
  },
  updated() {
    try {
      //reset validation for new->edit or edit->new
      this.$refs.form.resetValidation();
    } catch (error) {
      console.log(error);
    }

    if (this.$store.getters.getRequestMethod == "post") {
      console.log("in the updated");
      console.log(this);

      //decision point, calling the reset method of newEmployee.vue
      /* this.apiBase == "/em/ei/employee/"
        ? this.$refs.form.$children[0].reset()
        : this.$refs.form.reset();

 */

      try {
        //this is for file handling purpose, employeeManagement->education info
        this.formArray.forEach((n, i, a) => {
          console.log(a);
          if (n.name == "file") {
            a[i].haveBtn = false;
            a[i].readonly = false;
            a[i].rules = [ v => !!v || false ];
          }
        });
      } catch (error) {
        console.log(error);
      }

      if (this.apiBase == "/em/ei/employee/") {
        console.log("in the dialog");
        console.log(this);
        this.$refs.form.$children[0].reset();
      } else {
        console.log("aleterante ref");
        try {
          console.log(this);
          // this is behaving quite exceptional for employeeManagement->family member info, that it said refs.form is undefined,
          //maybe this is being called multiple time that's why in the first time it showed undefined,
          //otherwise everything is working fine
          this.$refs.form.reset();
        } catch (error) {
          console.log(error);
        }
      }

      //make readonly
      !this.R.isNil(this.formArray)
        ? this.formArray.forEach((n, i, a) => {
            a[i].readonly = false;
            // this is because checkbox should be null, it should be boolean
            n.type == "cCheckBox" ? (a[i].value = false) : "";
          })
        : "";
    }
  }
};
</script>