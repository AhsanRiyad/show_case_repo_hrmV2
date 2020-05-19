<template>
  <span>
    <!-- for reference https://github.com/zdy1988/vue-jstree -->
    <v-jstree :data="data" multiple allow-batch whole-row v-if="ready">
      <template scope="_">
        <div style="display: inherit; width: 100%">
          <i :class="_.vm.themeIconClasses" role="presentation"></i>
          <span @click="showItem(_.vm, _.model, $event)">{{ _.model.label }}</span>
          <button
            style="border: 0px; background-color: transparent; cursor: pointer; margin-left: 2px;"
            @click="addItem(_.vm, _.model, $event)"
          >
            <i class="material-icons" style="font-size: 1.2em;">add</i>
          </button>
        </div>
      </template>
    </v-jstree>

    <commonDialog :infoTree="data" :formArray.sync="formArray" newOrviewOrEditOrCorrectionProps="new" :dialogVisible="myDialogVisible" @close="myDialogClose">
      <template v-slot:formDialog>
        <allFormInputs  :formArray.sync="formArray" ></allFormInputs>
      </template>
    </commonDialog>
  
  </span>
</template>
<script>
// import the component
import VJstree from "vue-jstree";
import commonMixins from "@/mixins/commonMixins";

export default {
  components: {
    VJstree: VJstree
  },
  mixins: [commonMixins],
  data: () => {
    return {
      nameOfSlot: "",
      ready: false,
      data: [],
      
      formArray: [
      {
        type: "cTextField",
        label: "Organization Name*",
        name: "name",
        value: "",
        required: true,
      },
      {
        type: "cAutoComplete",
        label: "Office Type*",
        name: "officeId",
        api: "/ws/office/getAll/active?page=0&pageSize=50",
        required: true,
        value: ""
      },
      {
        type: "cAutoComplete",
        label: "Organization Type*",
        name: "orgTypeId",
        api: "/ws/organizationType/getAll/active?page=0&pageSize=50",
        required: true,
        value: ""
      },
      {
        type: "cTextField",
        label: "Cost Center Code*",
        name: "costCenterCode",
        value: "",
        required: true,
      },
      {
        type: "cDatePicker",
        value: "",
        label: "Start Date*",
        name: "startDate",
        required: true,
        max: "endDate"
      },
      {
        type: "cDatePicker",
        value: "",
        label: "End Date",
        name: "endDate",
        required: false,
        min: "startDate"
      },
      //invisible field
      {
        type: "cTextField",
        label: "orgParentId",
        name: "orgParentId",
        value: "",
        visible: false,
        required: true,
      },
    ]
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.apiRequestData.method = "get";
      this.apiRequestData.api = "/ws/organization/getTree";
      this.apiRequestData.item = {};
      //axios calling, actions will be dispatched asynchronously
      this.$store
        .dispatch("callApi", this.apiRequestData)
        .then(response => {
          //saves the items from the database in the table
          this.data = [...JSON.parse(response[0])];
          // saving the treeInfo in a store variable as when another component
          //  or dialog is opened all info is removed
          // this.$store.commit('setTreeInfo', [...JSON.parse(response[0])]);
          this.ready = true;
        })
        .catch(() => {});
    },
    showItem(node) {
      console.log(node);
      console.log(node.model.label + "show clicked !");
      console.log(this.data);
    },
    addItem(node) {
      console.log(node);
      console.log(node.model.label + " add clicked !");
      console.log(node.model);

      this.formArray[
      this._.findIndex( this.formArray, { name: 'orgParentId' } )
      ].value =  node.model.id ;

      this.myDialogVisible = true;
    }
  }
};
</script>
