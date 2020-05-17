<template>
  <span>
    <treeselect
      :options="options"
      :value="value1"
      :searchable="false"
      :show-count="true"
      :default-expand-level="1"
      :required="true"
      clearable
      style="border-style: dotted;"
      @input="updateValue"
      @select="select"
    >
      <!--  <label
        slot="option-label"
        slot-scope="{ node, shouldShowCount, count, labelClassName, countClassName }"
        :class="labelClassName"
      >
        {{ node.isBranch ? '' : '' }}: {{ node.label }}
        <span
          v-if="shouldShowCount"
          :class="countClassName"
        >({{ count }})</span>
      </label>-->
      <treeselect-value :value="value" />
    </treeselect>
  </span>
</template>

<script>
// import the component
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

import commonMixins from "../../mixins/commonMixins";

export default {
  // register the component
  components: { Treeselect },
  mixins: [commonMixins],
  data() {
    return {
      // define the default value
      value: null,
      value1: null,
      // define options
      options: [
        {
          id: "aid",
          label: "a",
          parentId: "okay",
          children: [
            {
              id: "aaid",
              label: "aa"
            },
            {
              id: "abid",
              label: "ab",
              children: [
                {
                  id: "aba",
                  label: "abb"
                },
                {
                  id: "aca",
                  label: "acb"
                }
              ]
            }
          ]
        },
        {
          id: "b",
          label: "b"
        },
        {
          id: "c",
          label: "c"
        }
      ]
    };
  },
  created() {
    this.getData();
  },
  methods: {
    select(n, i) {
      console.log("printing n");
      console.log(n);
      console.log("printing i");
      console.log(i);
    },

    updateValue(params) {
      console.log(params);
      console.log(this.value1);
    },
    //base table funcitons ends
    getData() {
      //a very common getData function for baseTable, will be call at the created lifeCycle hook
      this.apiRequestData.method = "get";
      this.apiRequestData.api = "/ws/organization/getTree";
      this.apiRequestData.item = {};

      //table loader
      this.tableLoading = true;

      //axios calling, actions will be dispatched asynchronously
      this.$store
        .dispatch("callApi", this.apiRequestData)
        .then(response => {
          this.tableLoading = false;
          //saves the items from the database in the table
          let a = JSON.parse(response[0]);
          console.log(a);
          this.options = a;
          console.log(this.options);
        })
        .catch(() => {
          this.tableLoading = false;
        });
    }
  },
  watch: {
    value1: {
      handler: function name(newVal, oldVal) {
        console.log(newVal);
        console.log(oldVal);
      },
      immediate: true
    }
  }
};
</script>

