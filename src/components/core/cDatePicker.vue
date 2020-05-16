<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="date"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="dateFormatted"
        :label="label"
        color="red darken-1"
        prepend-icon="event"
        v-on="on"
        :rules="fieldRulesProp( rules.required , rules.name )"
        :clearable=" !readonly "
        :readonly=" !R.isNil(readonly) ? readonly : true "
        autocomplete="off"
      ></v-text-field>
    </template>
    <v-date-picker :min="min" :max="max" @input="handleValue" v-model="date"
    :readonly=" !R.isNil(readonly) ? readonly : true "
     no-title scrollable>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
      <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
import commonMixins from "../../mixins/commonMixins";

export default {
  name: "cDatePicker",
  props: ["value", "label", "min", "max", "rules", "readonly"],
  mixins: [commonMixins],
  data: () => ({
    date: "",
    dateFormatted: "",
    menu: false,
    modal: false,
    menu2: false
  }),
  computed: {
    inputVal: {
      //this is not helpful here, after using it there were many common problem arised
      get() {
        return this.value;
      },
      set(val) {
        this.date = val;
        this.$emit("input", val);
      }
    }
  },
  methods: {
    //format the date as required, here i used moment library
    getDateFormatted(date) {
      return this.moment(date).format("DD-MM-YYYY");
    },
    handleValue(val) {
      //help to pass value from this child component to its parent
      this.$emit("input", val);
    }
  },
  mounted() {
    this.date = this.value;
  },
  watch: {
    value: {
      handler: function(newVal) {
        //this will be useful updating date from the parent
        this.dateFormatted = this.moment(newVal).format("DD-MM-YYYY");
      },
      immediate: true
    },
    min: {
      handler: function() {},
      immediate: true
    },
    max: {
      handler: function() {},
      immediate: true
    },
    date: {
      handler: function() {
        //this two lines of code will prevent the date picker from being called automatically in the initialization.
        //as a result it would always showed red error mark in the text field
        this.dateFormatted = this.moment(this.date).format("DD-MM-YYYY");
        this.dateFormatted == "Invalid date" ? (this.dateFormatted = "") : "";
      },
      immediate: true
    }
  },
  updated() {
    this.dateFormatted == "Invalid date" ? (this.dateFormatted = "") : "";
  }
};
</script>