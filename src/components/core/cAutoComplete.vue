<template>
  <v-autocomplete
    :label="label"
    :items="items"
    item-text="name"
    item-value="id"
    v-model="inputVal"
    cache-items
    autocomplete="off"
    :filter="customFilter"
    color="red darken-1"
    @input="handleValue"
    :rules="fieldRulesProp( rules.required , rules.name )"
    :clearable=" !readonly"
    :readonly=" !R.isNil(readonly) ? readonly : true "
  ></v-autocomplete>
</template>

<script>
import commonMixins from '@/mixins/commonMixins'
export default {
  name: "cAutoComplete",
  props: ["value", "label", "rules", "api" , "readonly"],
  mixins: [commonMixins],
  data() {
    return {
      content: "",
      model: null,
    };
  },
  computed: {
    inputVal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  },
  methods: {
    customFilter(item, queryText) {
      const textOne = item.name.toLowerCase();
      // const textTwo = item.abbr.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 /* || textTwo.indexOf(searchText) > -1 */
      );
    },
    handleValue() {
      console.log("okay");
      console.log(this.value);
    },
    getData() {
            //a very common getData function for baseTable, will be call at the created lifeCycle hook
            this.apiRequestData.method = "get";
            this.apiRequestData.api = this.api;
            this.apiRequestData.data = {};

            //axios calling, actions will be dispatched asynchronously
            this.$store.dispatch("callApi", this.apiRequestData).then(response => {
                this.items = response;
            }).catch(() => {});
        }
  },
  mounted(){
    this.getData();
  }
};
</script>