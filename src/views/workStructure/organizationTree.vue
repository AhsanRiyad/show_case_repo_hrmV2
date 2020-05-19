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

    <commonDialog :dialogVisible="myDialogVisible" @close="myDialogClose">
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
      ready: false,
      data: [],
      formArray: [],
      infoOfaId: {},
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
      
      this.myDialogVisible = true;
      console.log(this.data);

    },
    addItem(node) {
      console.log(node);
      console.log(node.model.label + " add clicked !");
    }
  }
};
</script>
