<template>
  <v-row justify="center">
    <v-dialog v-model="intDialogVisible" persistent max-width="800px">
      <v-card>
        <v-toolbar class="white--text" color="red darken-1">City Bank</v-toolbar>
        <v-container>
          <v-form ref="form">
            <slot ref="slotForm" :parentVal="parentVal" name="formDialog"></slot>
          </v-form>
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
      if (this.$route.name == "employee") {
        //form slot->children named newEmployee.vue ->submit function
        this.$refs.form.$children[0].submit();
      } else {
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
    }
  },
  created() {
    this.infoOfaIdFromProps = this.infoOfaId;
  },
  mounted() {
    console.log("this is common dialog");
  },
  updated() {
    if (this.$store.getters.getNewOrOldChecker == "new") {
      this.$refs.form.reset();
      //make readonly
      this.formArray.forEach((n, i, a) => {
        a[i].readonly = false;
        // this is because checkbox should be null, it should be boolean
        n.type == "cCheckBox" ? (a[i].value = false) : "";
      });
      this.$store.commit("setNewOrOldChecker", "updated");
    }
  }
};
</script>