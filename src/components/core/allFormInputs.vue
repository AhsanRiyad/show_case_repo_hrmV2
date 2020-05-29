<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        sm="12"
        :md="n.type == 'cTextArea' || n.type == 'cTreeSelect' ?  12 : 6"
        v-for="(n, i) in formArray"
        :key="i"
      >
        <v-textarea
          :id="n.name"
          v-if=" n.type == 'cTextArea' "
          filled
          rows="2"
          :label="n.label"
          v-model="n.value"
          :rules="fieldRulesProp( !R.isNil(n.required) ? n.required : true ,  n.name)"
          :readonly="!R.isNil(n.readonly) ? n.readonly : false"
          :clearable="!R.isNil(n.readonly) ? !n.readonly : true"
          :disabled="!R.isNil(n.disabled) ? !n.disabled : false"
          autocomplete="off"
        ></v-textarea>

        <v-text-field
          :id="n.name"
          v-if=" n.type == 'cTextField' "
          v-show=" !R.isNil(n.visible) ? n.visible : true "
          color="red darken-1"
          :label="n.label"
          v-model="n.value"
          :rules="fieldRulesProp( !R.isNil(n.required) ? n.required : true ,  n.name)"
          :readonly="!R.isNil(n.readonly) ? n.readonly : false"
          :clearable="!R.isNil(n.readonly) ? !n.readonly : true"
          :disabled="!R.isNil(n.disabled) ? !n.disabled : false"
          :append-icon="!R.isNil(n.appendIcon) ? n.appendIcon : null"
          :prepend-icon="!R.isNil(n.prependIcon) ? n.prependIcon : null"
          :filled="!R.isNil(n.filled) ? n.filled : false"
          autocomplete="off"
          @keyup.stop="!R.isNil(n.keyUpEvent) ? n.keyUpEvent(n) : ()=>{}"
        ></v-text-field>

        <v-checkbox v-if="n.type == 'cCheckBox' " :label="n.label" v-model="n.value"></v-checkbox>

        <cTreeSelect
          :id="n.name"
          v-if=" n.type=='cTreeSelect' "
          v-model="n.value"
          :label="n.label"
          placeholder="n.label"
          :api=" !R.isNil(n.api) ? n.api : '' "
          :disabled="!R.isNil(n.disabled) ? n.disabled : false"
        ></cTreeSelect>

        <cAutoComplete
          :id="n.name"
          v-if="n.type == 'cAutoComplete'"
          :label="n.label"
          v-model="n.value"
          :itemsFromProps="!R.isNil(n.items) ? n.items : undefined"
          :api=" !R.isNil(n.api) ? n.api : '' "
          :rules="{ required: !R.isNil(n.required) ? n.required : true , name: n.Name }"
          :readonly="!R.isNil(n.readonly) ? n.readonly : false"
          :disabled="!R.isNil(n.disabled) ? n.disabled : false"
          :changeEvent="!R.isNil(n.changeEvent) ? n.changeEvent : ()=>{}"
        ></cAutoComplete>

        <cDatePicker
          :id="n.name"
          v-if="n.type == 'cDatePicker'"
          :label="n.label"
          v-model="n.value"
          :min=" !R.isNil(n.min) ? R.find(R.propEq('name' , n.min))(formArray).value : '' "
          :max=" !R.isNil(n.max) ? R.find(R.propEq('name' , n.max))(formArray).value : '' "
          :rules="{ required: !R.isNil(n.required) ? n.required : true , name: n.Name }"
          :readonly="!R.isNil(n.readonly) ? n.readonly : false"
        ></cDatePicker>

        <v-file-input
          v-if="n.type=='cFileInput'"
          show-size
          chips
          :rules="n.rules"
          :multiple="n.multiple"
          :accept="n.accept"
          :label="n.label"
          v-model="n.value"
        ></v-file-input>
        
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import commonMixins from "../../mixins/commonMixins";

export default {
  name: "allFormInput",
  props: ["formArray", "age2"],
  mixins: [commonMixins],
  data() {
    return {};
  },
  computed: {},
  methods: {
    changeEvent($event) {
      console.log($event);
    }
  },
  created() {
    console.log("in the all form input");
    console.log(this.formArray);
  },
  updated() {},
  destroy() {},
  watch: {}
};
</script>