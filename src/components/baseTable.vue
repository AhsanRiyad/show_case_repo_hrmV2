<template>
  <span>
    <v-card>
      <v-card-title>
        <v-btn
          tile
          color="red darken-1"
          dark
          @click.stop="()=>{ actionIsNew(formArray) }"
        >{{ getFrontButtonName }}
        </v-btn>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          autocomplete="off"
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="tableHeader"
        :items="items"
        height="400"
        :search="search"
        class="elevation-1 table-header scroll-y"
        :loading="tableLoading"
        :fixed-header="true"
      >
        <!-- for checkbox starts-->
        <template v-slot:item.sol="{ item }">{{ item.sol == true ? 'Yes' : 'No' }}</template>
        <template v-slot:item.costCenter="{ item }">{{ item.costCenter == true ? 'Yes' : 'No' }}</template>
        <!-- for checkbox ends-->

        <!-- start date and end date starts -->
        <template v-slot:item.startDate="{ item }">{{ getDateFormatted( item.startDate ) }}</template>

        <template v-slot:item.endDate="{ item }">{{ getDateFormatted( item.endDate ) }}</template>
        <!-- start date and end date starts -->

        <!-- this is for action column -->
        <template v-slot:item.actions="item">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                v-on="on"
                class="ma-1"
                small
                @click.stop="()=>doActionOnItem('view', item )"
              >pageview</v-icon>
            </template>
            <span>View</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                v-on="on"
                class="ma-1"
                small
                @click.stop="()=>doActionOnItem('edit', item )"
              >edit</v-icon>
            </template>
            <span>Edit</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                v-on="on"
                class="ma-1"
                small
                @click.stop="()=>doActionOnItem('correction', item )"
              >spellcheck</v-icon>
            </template>
            <span>Correction</span>
          </v-tooltip>
        </template>
        <!-- <template v-slot:item.actions="item">hellow {{ checkingHeaders(item) }}</template> -->
      </v-data-table>
    </v-card>

    <commonDialog
      :newOrviewOrEditOrCorrectionProps="newOrviewOrEditOrCorrection"
      :formArray.sync="formArray"
      :dialogVisible="myDialogVisible"
      :infoOfaId="infoOfaId"
      @close="myDialogClose"
      ref="commonDialog"
    >
      <template v-slot:formDialog>
        <slot age2="22" ref="slotForm" :name="nameOfSlot"></slot>
      </template>
    </commonDialog>
  </span>
</template>

<script>
//a very common mixins for all the components
import commonMixins from "../mixins/commonMixins";

export default {
  name: "baseTable",
  mixins: [commonMixins],
  // props: ["tableHeader", "formArray", "apiBase"],
  props: {
    tableHeader: {
      type: [Array, Object],
      default: undefined
    },
    formArray: {
      type: [Array],
      default: undefined
    },
    apiBase: {
      type: [String],
      default: undefined
    }
  },

  data: () => ({
    infoOfaId: {}
  }),
  created() {
    this.getData("/getAll/active?page=0&pageSize=50");
  }
};
</script>

