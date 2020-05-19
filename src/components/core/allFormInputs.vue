<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        sm="12"
        :md="n.type == 'cTextArea' ?  12 : 6"
        v-for="(n, i) in formArray"
        :key="i"
        @click.stop="solveInputValidation"
      >
        <v-textarea
          v-if=" n.type == 'cTextArea' "
          filled
          rows="2"
          :label="n.label"
          v-model="n.value"
          :rules="fieldRulesProp( !R.isNil(n.required) ? n.required : true ,  n.name)"
          :readonly="!R.isNil(n.readonly) ? n.readonly : false"
          :clearable="!R.isNil(n.readonly) ? !n.readonly : true"
          autocomplete="off"
        ></v-textarea>

        <!-- here setNewOrOldChecker is for creating new value and for form validation, all are linked up -->
        <v-text-field
          v-if=" n.type == 'cTextField' "
          v-show=" !R.isNil(n.visible) ? n.visible : true "
          color="red darken-1"
          :label="n.label"
          v-model="n.value"
          :rules="fieldRulesProp( !R.isNil(n.required) ? n.required : true ,  n.name)"
          :readonly="!R.isNil(n.readonly) ? n.readonly : false"
          :clearable="!R.isNil(n.readonly) ? !n.readonly : true"
          autocomplete="off"
        ></v-text-field>

        <v-checkbox v-if="n.type == 'cCheckBox' " :label="n.label" v-model="n.value"></v-checkbox>

        <cTreeSelect
        v-if=" n.type=='cTreeSelect' "
        v-model="n.value" 
        placeholder="n.label"
        :api=" !R.isNil(n.api) ? n.api : '' "
        >
        </cTreeSelect>

        <cAutoComplete
          v-if="n.type == 'cAutoComplete' "
          :label="n.label"
          v-model="n.value"
          :api=" !R.isNil(n.api) ? n.api : '' "
          :rules="{ required: !R.isNil(n.required) ? n.required : true , name: n.Name }"
          :readonly="!R.isNil(n.readonly) ? n.readonly : false"
        ></cAutoComplete>

        <cDatePicker
          v-if="n.type == 'cDatePicker'"
          :label="n.label"
          v-model="n.value"
          :min=" !R.isNil(n.min) ? R.find(R.propEq('name' , n.min))(formArray).value : '' "
          :max=" !R.isNil(n.max) ? R.find(R.propEq('name' , n.max))(formArray).value : '' "
          :rules="{ required: !R.isNil(n.required) ? n.required : true , name: n.Name }"
          :readonly="!R.isNil(n.readonly) ? n.readonly : false"
        ></cDatePicker>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import commonMixins from "../../mixins/commonMixins";

import { mapGetters } from "vuex";
export default {
  name: "allFormInput",
  props: ["formArray", "age2"],
  mixins: [commonMixins],
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getNewOrOldChecker"])
  },
  methods: {},
  created() {
    console.log("in the all form input");
    console.log(this.formArray);
  },
  updated() {},
  destroy() {},
  watch: {
    getNewOrOldChecker: {
      handler(newVal) {
        console.log("this is map getters");
        console.log(newVal);
      },
      immediate: true,
      deep: true
    }
  }
};
</script>