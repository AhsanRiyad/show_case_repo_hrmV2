<template>
  <v-autocomplete
    :items="states"
    v-model="inputVal"
    :filter="customFilter"
    color="red darken-1"
    item-text="name"
    :label="label"
    @input="handleValue"
    :rules="fieldRulesProp( rules.required , rules.name )"
  ></v-autocomplete>
</template>

<script>
export default {
  name: "cAutoComplete",
  props: ["value", "label", "rules"],
  data() {
    return {
      content: "",
      model: null,
      states: [
        { name: "Florida", abbr: "FL", id: 1 },
        { name: "Georgia", abbr: "GA", id: 2 },
        { name: "Nebraska", abbr: "NE", id: 3 },
        { name: "California", abbr: "CA", id: 4 },
        { name: "New York", abbr: "NY", id: 5 }
      ]
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
      const textTwo = item.abbr.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    },
    handleValue() {
      console.log("okay");
      console.log(this.value);
    }
  }
};
</script>