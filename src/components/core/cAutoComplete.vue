<template>
  <v-autocomplete
    :label="label"
    :items="items"
    item-text="name"
    item-value="id"
    v-model="inputVal"
    autocomplete="off"
    :filter="customFilter"
    color="red darken-1"
    item-color="red darken-1"
    @input="handleValue"
    :rules="fieldRulesProp( rules.required , rules.name )"
    :clearable=" !readonly "
    :readonly=" !R.isNil(readonly) ? readonly : true "
    :disabled="!R.isNil(disabled) ? disabled : false"
    :height="!R.isNil(height) ? height : undefined"
    :multiple="!R.isNil(multiple) ? multiple : false"
    :chips="!R.isNil(chips) ? chips : false"
    :id="id"
  ></v-autocomplete>
</template>

<script>
import commonMixins from "../../mixins/commonMixins";
export default {
  name: "cAutoComplete",
  props: {
    value: [String, Number,Array],
    label: [String, Number],
    rules: [String, Number, Array, Object],
    api: [String],
    readonly: [Boolean],
    disabled: [Boolean],
    itemsFromProps: [String, Number, Array, Object],
    changeEvent: [Function],
    id: [String, Number],
    allData:[Array,Object,String],
    height:[String,Number],
    multiple:[String,Number,Boolean],
    chips:[String,Number,Boolean],
  },
  mixins: [commonMixins],
  data() {
    return {
      content: "",
      model: null
    };
  },
  computed: {
    inputVal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
        this.changeEvent(val , this.allData.dependentFieldName, this.allData.dependentApi);
      }
    }
  },
  methods: {
    customFilter(item, queryText) {
      const textOne = item.name.toLowerCase();
      // const textTwo = item.abbr.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) >
        -1 /* || textTwo.indexOf(searchText) > -1 */
      );
    },
    handleValue() {
      console.log("okay");
      console.log(this.value);
    },
    getData() {
      //a very common getData function for baseTable, will be call at the created lifeCycle hook
      this.$store.commit("setRequestMethod", "get");
      this.apiRequestData.api = this.api;
      this.apiRequestData.data = {};

      //axios calling, actions will be dispatched asynchronously
      this.$store
        .dispatch("callApi", this.apiRequestData)
        .then(response => {
          this.items = response;
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.R.isNil(this.itemsFromProps) || this.R.isEmpty(this.itemsFromProps)
      ? this.getData()
      : (this.items = this.itemsFromProps);
  },
  watch: {
    itemsFromProps: {
      handler: function(newVal, oldVal) {
        console.log(newVal);
        console.log(oldVal);
        this.items = newVal;
      },
      immediate: true
    }
  }
};
</script>