<template>
  <span>
    <v-card>
      <v-card-title>
        <v-btn
          tile
          color="red darken-1"
          dark
          @click.stop="()=>{ myDialogVisible = true; actionIsNew(formArray); newOrviewOrEditOrCorrection = 'new'; }"
        >{{ getFrontButtonName }}</v-btn>
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
        :search="search"
        class="elevation-1 table-header scroll-y"
        :loading="tableLoading"
      >

    <template v-slot:item.sol="{ item }">
    {{ item.sol == true ? 'Yes' : 'No' }}
    </template>  

    <template v-slot:item.startDate="{ item }">
    {{ getDateFormatted( item.startDate ) }}
    </template>  

    <template v-slot:item.endDate="{ item }">
    {{ getDateFormatted( item.endDate ) }}
    </template>  


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
                @click.stop="()=>doActionOnItem('edit', item )"
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
  props: ["tableHeader", "formArray", "apiBase"],
  data: () => ({
    infoOfaId: {},
  }),
  created() {
    this.getData("/getAll/active?page=0&pageSize=50");
  }
};
</script>

<style scoped></style>

<style lang="scss" scoped>
.table-header {
  thead {
    border-width: 1px;
    border-style: solid;
    border-color: #8e8a8b transparent;
    background: linear-gradient(to top, #ececf3 0%, white 100%);
    text-decoration: white;
  }
  th {
    position: sticky !important;
    background: linear-gradient(to top, #ececf3 0%, white 100%);
    color: #f5f5f5;
    font-weight: 600;
  }
  .column {
    font-weight: 5px;
    font-size: 1.15em;
    color: #564e5f;
  }
}
table.v-table tbody td:first-child,
table.v-table tbody td:not(:first-child),
table.v-table tbody th:first-child,
table.v-table tbody th:not(:first-child),
table.v-table thead td:first-child,
table.v-table thead td:not(:first-child),
table.v-table thead th:first-child,
table.v-table thead th:not(:first-child) {
  padding: 0 0.1em;
}

.v-icon--link {
  padding-top: 0.6em;
}
/*tr:first-child .v-icon--link /deep/{
	padding-top: .5em;
	}*/
.v-datatable tbody tr:first-child td:last-child i:first-child {
  margin-left: 1.35em;
}

.v-card__title {
  padding: 0;
  min-height: 6em;
}
.v-datatable__actions {
  display: none !important;
}

.v-label {
  color: white;
}
</style>
