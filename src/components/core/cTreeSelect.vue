<template>
  <span>
    <!-- for reference https://vue-treeselect.js.org/#props -->
    <treeselect
      :options="options"
      :value="inputVal"
      :searchable="false"
      :show-count="true"
      :default-expand-level="1"
      :required="true"
      clearable
      style=" border-top: 5px solid white;"
      @input="updateValue"
      @select="select"
      :placeholder="label"
      :matchKeys="['name']"
      :disabled="!R.isNil(disabled) ? disabled : false"
      
    >
      <div slot="value-label" slot-scope="{ node }">{{ node.raw.name }}</div>
       <label
        slot="option-label"
        slot-scope="{ node, shouldShowCount, count, labelClassName, countClassName }"
        :class="labelClassName"
        :id="id"
      >
        {{ node.isBranch ? '' : '' }}  {{ node.raw.name }}
        <span
          v-if="shouldShowCount"
          :class="countClassName"
        >({{ count }})</span>
      </label>
      <treeselect-value  :value="inputVal" />
    </treeselect>
  </span>
</template>
<script>
// import the component
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import commonMixins from "@/mixins/commonMixins";
export default {
  name: "cTreeSelect",
  // register the component
  components: { Treeselect },
  mixins: [commonMixins],
  props: ['value', 'label' , "api", "disabled", "id"],
  data() {
    return {
      // define the default value
      my_value: 1,
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
  computed: {
     inputVal: {
      get() {
        // if( this.R.isNil( this.value) ){
        //   return 1;
        // }
        // return 1;
        // console.log('return value');
        // console.log(this.value);
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  },
  methods: {
    select(n, i) {
      console.log("printing n");
      console.log(n);
      console.log("printing i");
      console.log(i);
    },
    updateValue(params) {
      console.log("this is my value");
      console.log(params);
      console.log(this.my_value);

      this.$emit("input", params);
    },
    //base table funcitons ends
    getData() {
      //a very common getData function for baseTable, will be call at the created lifeCycle hook
      this.$store.commit("setRequestMethod", "get");
      this.apiRequestData.api = "/ws/organization/getTree";
      this.apiRequestData.item = {};
      //table loader
      //axios calling, actions will be dispatched asynchronously
      this.$store
        .dispatch("callApi", this.apiRequestData)
        .then(response => {
          //saves the items from the database in the table
          let a = JSON.parse(response[0]);
          console.log(a);
          this.options = a;
          console.log(this.options);
        })
        .catch(() => {});
    }
  },
  watch: {
  }
};
</script>
