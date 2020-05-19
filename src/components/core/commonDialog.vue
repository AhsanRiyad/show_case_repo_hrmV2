<template>

  <v-row justify="center">
    <v-dialog
    v-model="intDialogVisible"
    persistent max-width="800px"
    >
    <v-card>
      <v-toolbar class="white--text" color="red darken-1">
        City Bank
      </v-toolbar>
      <v-container>
        <v-form ref="form">
          <slot ref="slotForm" :parentVal="parentVal" name="formDialog" > </slot>
        </v-form>
      </v-container>

      <v-card-text>
        <v-container>
          <v-row>

          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text  @click="intDialogVisible = false">Close</v-btn>
        <v-btn v-if="newOrviewOrEditOrCorrectionProps != 'view'" color="red darken-1" text @click.stop="()=>submit(newOrviewOrEditOrCorrectionProps)">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</v-row>
</template>
<script>
  import commonMixins from '../../mixins/commonMixins'
  export default {
    props: {
      dialogVisible :{
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
        default: 'view'
      },
      infoOfaId: {
        type: [Object, Array],
        default: undefined
      },
      infoTree: {
        type: [Object, Array],
        default: undefined
      }
    },
    mixins: [ commonMixins ],
    data () {
      return {
        dialog: false,
        parentVal: '',
        infoOfaIdFromProps : {},
      }
    },
    computed: {
      intDialogVisible: {
        get: function () {
          return this.dialogVisible
        },
        set: function (value) {
         if (!value) {
           this.$emit('close');
         }
       }
     }
   },
   methods: {
     closeDialog(){},
    clicked(){
      console.log('clicked');
    }
  },
  watch: {
    infoOfaId : {
      handler: function (newVal) {
        this.infoOfaIdFromProps = newVal;
      },
      immediate: true,
    }
  },
  created(){
    this.infoOfaIdFromProps = this.infoOfaId;
  }
}
</script>