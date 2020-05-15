<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        sm="12"
        :md="n.type == 'cTextArea' ?  12 : 6"
        v-for="(n, i) in formArray"
        :key="i"
      >
        <v-textarea
          v-if=" n.type == 'cTextArea' "
          filled
          rows="2"
          :label="n.label"
          v-model="n.value"
          :rules="fieldRulesProp(n.required ,  n.name)"
        ></v-textarea>

        <v-text-field
          v-if=" n.type == 'cTextField' "
          color="red darken-1"
          :label="n.label"
          v-model="n.value"
          :rules="fieldRulesProp(n.required ,  n.name)"
        ></v-text-field>

        <cAutoComplete
          v-if="n.type == 'cAutoComplete' "
          :label="n.label"
          v-model="n.value"
          :api=" !R.isNil(n.api) ? n.api : '' "
          :rules="{ required: n.required , name: n.Name }"
        ></cAutoComplete>

        <cDatePicker
          v-if="n.type == 'cDatePicker'"
          :label="n.label"
          v-model="n.value"
          :min=" !R.isNil(n.min) ? R.find(R.propEq('name' , n.min))(formArray).value : '' "
          :max=" !R.isNil(n.max) ? R.find(R.propEq('name' , n.max))(formArray).value : '' "
          :rules="{ required: n.required , name: n.Name }"
        ></cDatePicker>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import commonMixins from "@/mixins/commonMixins";
import eventBus from "@/eventBus/eventBus";
export default {
  name: "allFormInput",
  props: ["formArray", "age2"],
  mixins: [commonMixins],
  data() {
    return {};
  },
  methods: {},
  created() {
    eventBus.$on("updateForm", function(payLoad) {
      console.log("firing event bus");
      console.log(payLoad);
    });
  },
  watch: {
    formArray: {
      handler() {},
      immediate: true,
      deep: true
    }
  }
};
</script>