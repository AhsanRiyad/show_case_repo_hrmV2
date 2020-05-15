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
        <v-btn color="red darken-1" text @click.stop="submit">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</v-row>
</template>
<script>
  import commonMixins from '@/mixins/commonMixins'
  export default {
    props:['dialogVisible', 'age2', 'formArray'],
    mixins: [ commonMixins ],
    data () {
      return {
        dialog: false,

        parentVal: '',

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
    clicked(){
      console.log('clicked');
    }
  },
}
</script>